import { NextRequest, NextResponse } from 'next/server';

// Define DB COnnection for getting/storing data
import connectDB from "@/lib/db";
// Highlevel match Schedule and Results
import Match from '@/models/frc-events/Match';
import { IMatch } from '@/models/frc-events/Match';
// Matches Scouting Data
import MatchScout from '@/models/scout/MatchScout';
import { IMatchScout } from '@/models/scout/MatchScout';
// Alliance Detail Scores for Matches
import MatchResult from '@/models/frc-events/MatchResult';
import { IMatchResult } from '@/models/frc-events/MatchResult';


export async function GET(req: NextRequest, { params }: { params: Promise<{ eventCode: string, }> }) {
    const eventCode = (await params).eventCode;
    console.log('Event Code: ' + eventCode);
    await connectDB();

    // Create match position to team number lookup
    const matchTeamPos: any = {};
    try {
        const match = await Match.find({ eventCode: eventCode });
        if (match === null) {
            return NextResponse.json({ error: 'No matches found in the database' });
        }
        for (const matchItem of match) {
            for (const team of matchItem.teams) {
                const matchPosID = matchItem.matchID + '-' + team.station;
                matchTeamPos[matchPosID] = team.teamNumber;
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error retrieving match results, schedule, and scouts for the event ' + eventCode });
    }

    // Create match position to scouted data lookup
    const matchScoutPos: any = {};
    let scoutDataExists = true
    try {
        const matchScout = await MatchScout.find({ eventCode: eventCode });
        if (matchScout === null) {
            scoutDataExists = false;
        }

        for (const matchScoutItem of matchScout) {
            const matchPosID = matchScoutItem.eventCode + '-' + matchScoutItem.tournamentLevel + '-' + matchScoutItem.matchNumber + '-' + matchScoutItem.alliancePosition;
            matchScoutPos[matchPosID] = {
                teamNumber: matchScoutItem.teamNumber,
                autoLaunches: matchScoutItem.autoLaunches,
                firstShiftLauches: matchScoutItem.firstShiftLauches,
                secondShiftLauches: matchScoutItem.secondShiftLauches,
                endgameLaunches: matchScoutItem.endgameLaunches,
                passHerdNeutral: matchScoutItem.passHerdNeutral,
                passHerdOpposing: matchScoutItem.passHerdOpposing,
                passLaunchedNeutral: matchScoutItem.passLaunchedNeutral,
                passLaunchedOpposing: matchScoutItem.passLaunchedOpposing,
                defenseNeutral: matchScoutItem.defenseNeutral,
                defenseOpposing: matchScoutItem.defenseOpposing,
                robotDied: matchScoutItem.robotDied,
                robotBroke: matchScoutItem.robotBroke,
            }

                
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error retrieving match results, schedule, and scouts for the event ' + eventCode });
    }

    // Process Match Detailed Results
    const matchTeamResults: any = {};

    try {
        const matchResults = await MatchResult.find({ eventCode: eventCode });
        if (matchResults === null) {
            return NextResponse.json({ error: 'No match results found in the database' });
        }
        for (const matchResultItem of matchResults) {
            for (const alliance of matchResultItem.alliances) {
                const matchAllianceID = matchResultItem.matchID + '-' + alliance.alliance;
                const robot1ID = matchAllianceID + '1';
                const robot2ID = matchAllianceID + '2';
                const robot3ID = matchAllianceID + '3';

                const r1teamNumber = matchTeamPos[robot1ID];
                const r2teamNumber = matchTeamPos[robot2ID];
                const r3teamNumber = matchTeamPos[robot3ID];

                const r1scoutData = matchScoutPos[robot1ID];
                const r2scoutData = matchScoutPos[robot2ID];
                const r3scoutData = matchScoutPos[robot3ID];

                let autoDenominator = 0;
                let firstShiftDenominator = 0;
                let secondShiftDenominator = 0;
                let endgameDenominator = 0;
                let allianceScouted = false;

                if (r1scoutData && r2scoutData && r3scoutData) {
                    autoDenominator = r1scoutData.autoLaunches + r2scoutData.autoLaunches + r3scoutData.autoLaunches;
                    firstShiftDenominator = r1scoutData.firstShiftLauches + r2scoutData.firstShiftLauches + r3scoutData.firstShiftLauches;
                    secondShiftDenominator = r1scoutData.secondShiftLauches + r2scoutData.secondShiftLauches + r3scoutData.secondShiftLauches;
                    endgameDenominator = r1scoutData.endgameLaunches + r2scoutData.endgameLaunches + r3scoutData.endgameLaunches;
                    allianceScouted = true;
                }

                // Store Match Level Summary Data
                matchTeamResults[robot1ID] = {
                    teamNumber: r1teamNumber,
                    autoClimb: alliance.autoTowerRobot1,
                    endgameClimb: alliance.endGameTowerRobot1,
                    autoOnlyFuel: alliance.hubScore.autoCount,
                    autoFuel: alliance.hubScore.autoCount + alliance.hubScore.transitionCount,
                    firstShiftFuel: alliance.hubScore.shift1Count + alliance.hubScore.shift2Count,
                    secondShiftFuel: alliance.hubScore.shift3Count + alliance.hubScore.shift4Count,
                    endgameFuel: alliance.hubScore.endgameCount,
                    adjAutoFule: autoDenominator > 0 ? Math.floor((alliance.hubScore.autoCount + alliance.hubScore.transitionCount) * (r1scoutData.autoLaunches / autoDenominator)) : 0,   
                    adjFirstShiftFule: firstShiftDenominator > 0 ? Math.floor((alliance.hubScore.shift1Count + alliance.hubScore.shift2Count) * (r1scoutData.firstShiftLauches / firstShiftDenominator)) : 0,   
                    adjSecondShiftFule: secondShiftDenominator > 0 ? Math.floor((alliance.hubScore.shift3Count + alliance.hubScore.shift4Count) * (r1scoutData.secondShiftLauches / secondShiftDenominator)) : 0,   
                    adjEndgameFule: endgameDenominator > 0 ? Math.floor((alliance.hubScore.endgameCount) * (r1scoutData.endgameLaunches / endgameDenominator)) : 0,
                    allianceScouted: allianceScouted,
                    scoutedData: r1scoutData,
                    autoDenominator: autoDenominator,
                    firstShiftDenominator: firstShiftDenominator,
                    secondShiftDenominator: secondShiftDenominator,
                    endgameDenominator: endgameDenominator,
                }

                matchTeamResults[robot2ID] = {
                    teamNumber: r2teamNumber,
                    autoClimb: alliance.autoTowerRobot2,
                    endgameClimb: alliance.endGameTowerRobot2,
                    autoOnlyFuel: alliance.hubScore.autoCount,
                    autoFuel: alliance.hubScore.autoCount + alliance.hubScore.transitionCount,
                    firstShiftFuel: alliance.hubScore.shift1Count + alliance.hubScore.shift2Count,
                    secondShiftFuel: alliance.hubScore.shift3Count + alliance.hubScore.shift4Count,
                    endgameFuel: alliance.hubScore.endgameCount,
                    adjAutoFule: autoDenominator > 0 ? Math.floor((alliance.hubScore.autoCount + alliance.hubScore.transitionCount) * (r2scoutData.autoLaunches / autoDenominator)) : 0,
                    adjFirstShiftFule: firstShiftDenominator > 0 ? Math.floor((alliance.hubScore.shift1Count + alliance.hubScore.shift2Count) * (r2scoutData.firstShiftLauches / firstShiftDenominator)) : 0,   
                    adjSecondShiftFule: secondShiftDenominator > 0 ? Math.floor((alliance.hubScore.shift3Count + alliance.hubScore.shift4Count) * (r2scoutData.secondShiftLauches / secondShiftDenominator)) : 0,   
                    adjEndgameFule: endgameDenominator > 0 ? Math.floor((alliance.hubScore.endgameCount) * (r2scoutData.endgameLaunches / endgameDenominator)) : 0,   
                    allianceScouted: allianceScouted,
                    scoutedData: r2scoutData,
                    autoDenominator: autoDenominator,
                    firstShiftDenominator: firstShiftDenominator,
                    secondShiftDenominator: secondShiftDenominator,
                    endgameDenominator: endgameDenominator,
                }

                matchTeamResults[robot3ID] = {
                    teamNumber: r3teamNumber,
                    autoClimb: alliance.autoTowerRobot3,
                    endgameClimb: alliance.endGameTowerRobot3,
                    autoOnlyFuel: alliance.hubScore.autoCount,
                    autoFuel: alliance.hubScore.autoCount + alliance.hubScore.transitionCount,
                    firstShiftFuel: alliance.hubScore.shift1Count + alliance.hubScore.shift2Count,
                    secondShiftFuel: alliance.hubScore.shift3Count + alliance.hubScore.shift4Count,
                    endgameFuel: alliance.hubScore.endgameCount,
                    adjAutoFule: autoDenominator > 0 ? Math.floor((alliance.hubScore.autoCount + alliance.hubScore.transitionCount) * (r3scoutData.autoLaunches / autoDenominator)) : 0,
                    adjFirstShiftFule: firstShiftDenominator > 0 ? Math.floor((alliance.hubScore.shift1Count + alliance.hubScore.shift2Count) * (r3scoutData.firstShiftLauches / firstShiftDenominator)) : 0,   
                    adjSecondShiftFule: secondShiftDenominator > 0 ? Math.floor((alliance.hubScore.shift3Count + alliance.hubScore.shift4Count) * (r3scoutData.secondShiftLauches / secondShiftDenominator)) : 0,   
                    adjEndgameFule: endgameDenominator > 0 ? Math.floor((alliance.hubScore.endgameCount) * (r3scoutData.endgameLaunches / endgameDenominator)) : 0,  
                    allianceScouted: allianceScouted,
                    scoutedData: r3scoutData,
                    autoDenominator: autoDenominator,
                    firstShiftDenominator: firstShiftDenominator,
                    secondShiftDenominator: secondShiftDenominator,
                    endgameDenominator: endgameDenominator,
                }
                
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error retrieving match detail results for the event ' + eventCode });
    }



    return NextResponse.json(matchTeamResults);

}