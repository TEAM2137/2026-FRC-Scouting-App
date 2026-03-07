import { NextRequest, NextResponse } from 'next/server';

// Define DB COnnection for getting/storing data
import connectDB from "@/lib/db";
// Currently Active Events
import CurrentEvent from "@/models/frc-events/CurrentEvent";
// Detailed Match Scores
import MatchResult from '@/models/frc-events/MatchResult';
// Match Schedule
import Match from '@/models/frc-events/Match';
import { IMatch, IMatchTeam } from "@/models/frc-events/Match";
// Scouted Match Scores
import MatchScout from "@/models/scout/MatchScout"


import storeMatchSummary from "@/lib/insights/storeMatchSummary"

const currentDate = parseInt(new Date().toISOString().split('T')[0].replace(/-/g, ''));
console.log('Current Date: ' + currentDate);
const currentEvent: string[] = ["MILAK"]

export async function GET(req: NextRequest) {
    // Load Data Sources
    const events: string[] = []

    try {
        await connectDB();
        const currentEvents = await CurrentEvent.findOne({ ID: currentDate.toString() });
        if (currentEvents === null) {
            return NextResponse.json({ error: 'No current events found in the database' });
        }
        const eventsList = currentEvents?.events;
        if (eventsList === null) {
            return NextResponse.json({ error: 'No events found in the database' });
        }
        for (const event of eventsList) {
            events.push(event.code);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error retrieving current event codes.' });
    }

    console.log(events)

    // Process Events
    for (const event of events) {
        const processedEvent = []
        try{
            const matchResults = await MatchResult.find({ eventCode: event }).sort({ matchNumber: 1 });

            const matchSchedule = await Match.find({ eventCode: event }).sort({ matchNumber: 1 });

            const matchScouts = await MatchScout.find({ eventCode: event }).sort({ matchNumber: 1 });
            
            const scoutRecords: any = {};
            if (matchScouts !== null) {
                for (const matchScout of matchScouts) {
                    const key: string = matchScout.eventCode + '-' + matchScout.tournamentLevel + '-' + matchScout.matchNumber.toString() + '-' + matchScout.teamNumber;
                    scoutRecords[key as keyof typeof scoutRecords] = {
                        teamNumber: matchScout.teamNumber,
                        scoutTeamNumber: matchScout.scoutTeamNumber,
                        eventCode: matchScout.eventCode,
                        tournamentLevel: matchScout.tournamentLevel,
                        matchNumber: matchScout.matchNumber,
                        alliancePosition: matchScout.alliancePosition,
                        autoLaunches: matchScout.autoLaunches,
                        firstShiftLauches: matchScout.firstShiftLauches,
                        secondShiftLauches: matchScout.secondShiftLauches,
                        endgameLaunches: matchScout.endgameLaunches,
                        robotDied: matchScout.robotDied,
                        robotBroke: matchScout.robotBroke,
                        passHeard: matchScout.passHeard,
                        passLaunched: matchScout.passLaunched,
                    }
                } 

            }
            const matchrecords: any = {};
            

            for (const match of matchSchedule) {
                const key: string = match.eventCode + '-' + match.tournamentLevel + '-' + match.matchNumber.toString();
                matchrecords[key as keyof typeof matchrecords] = {
                    RED1: {
                        teamNumber: match.teams[0].teamNumber,
                        scoutKey: key + "-" + match.teams[0].teamNumber,
                    },
                    RED2: {
                        teamNumber: match.teams[1].teamNumber,
                        scoutKey: key + "-" + match.teams[1].teamNumber,
                    },
                    RED3: {
                        teamNumber: match.teams[2].teamNumber,
                        scoutKey: key + "-" + match.teams[2].teamNumber,
                    },
                    BLUE1: {
                        teamNumber: match.teams[3].teamNumber,
                        scoutKey: key + "-" + match.teams[3].teamNumber,
                    },
                    BLUE2: {
                        teamNumber: match.teams[4].teamNumber,
                        scoutKey: key + "-" + match.teams[4].teamNumber,
                    },
                    BLUE3: {
                        teamNumber: match.teams[5].teamNumber,
                        scoutKey: key + "-" + match.teams[5].teamNumber,
                    },
                }
            }



            const proccessedrecords: any = {};
            // Process Match Results
            for (const matchResult of matchResults) {
                const key: string = matchResult.eventCode + '-' + matchResult.matchLevel + '-' + matchResult.matchNumber.toString();
                const blueallianceTotals = {
                    autoFuel: (matchResult.alliances[0].hubScore.autoCount + matchResult.alliances[0].hubScore.transitionCount),
                    firstShiftFuel: (matchResult.alliances[0].hubScore.shift1Count + matchResult.alliances[0].hubScore.shift2Count),
                    secondShiftFuel: (matchResult.alliances[0].hubScore.shift3Count + matchResult.alliances[0].hubScore.shift4Count),
                    endgameFuel: (matchResult.alliances[0].hubScore.endgameCount),
                    teleopFuel: (matchResult.alliances[0].hubScore.teleopCount),
                    totalFuel: (matchResult.alliances[0].hubScore.totalCount),
                    uncountedFuel: (matchResult.alliances[0].hubScore.uncounted),
                }
                const redallianceTotals = {
                    autoFuel: (matchResult.alliances[1].hubScore.autoCount + matchResult.alliances[1].hubScore.transitionCount),
                    firstShiftFuel: (matchResult.alliances[1].hubScore.shift1Count + matchResult.alliances[1].hubScore.shift2Count),
                    secondShiftFuel: (matchResult.alliances[1].hubScore.shift3Count + matchResult.alliances[1].hubScore.shift4Count),
                    endgameFuel: (matchResult.alliances[1].hubScore.endgameCount),
                    teleopFuel: (matchResult.alliances[1].hubScore.teleopCount),
                    totalFuel: (matchResult.alliances[1].hubScore.totalCount),
                    uncountedFuel: (matchResult.alliances[1].hubScore.uncounted),
                }


                proccessedrecords[key as keyof typeof proccessedrecords] = {
                    RED1: {
                        teamNumber: matchrecords[key].RED1.teamNumber,
                        AutoClimb: matchResult.alliances[1].autoTowerRobot1 === 'None' ? 0 : 15,
                        Endgame: matchResult.alliances[1].endGameTowerRobot1 === 'None' ? 0 : matchResult.alliances[0].endGameTowerRobot3 === 'Level1' ? 10 : matchResult.alliances[0].endGameTowerRobot3 === 'Level2' ? 20 : 30,
                        Teleop: matchResult.alliances[1].totalTeleopPoints,
                        Total: matchResult.alliances[1].totalPoints,
                        AutoFuel: redallianceTotals.autoFuel,
                        FirstShiftFuel: redallianceTotals.firstShiftFuel,
                        SecondShiftFuel: redallianceTotals.secondShiftFuel,
                        EndgameFuel: redallianceTotals.endgameFuel,
                        TeleopFuel: redallianceTotals.teleopFuel,
                        TotalFuel: redallianceTotals.totalFuel,
                        UncountedFuel: redallianceTotals.uncountedFuel,
                        scouted: scoutRecords[matchrecords[key].RED1.scoutKey]?.teamNumber ? true : false,
                        autoLaunches: scoutRecords[matchrecords[key].RED1.scoutKey]?.autoLaunches ? scoutRecords[matchrecords[key].RED1.scoutKey]?.autoLaunches : 0,
                        firstShiftLauches: scoutRecords[matchrecords[key].RED1.scoutKey]?.firstShiftLauches ? scoutRecords[matchrecords[key].RED1.scoutKey]?.firstShiftLauches : 0,
                        secondShiftLauches: scoutRecords[matchrecords[key].RED1.scoutKey]?.secondShiftLauches ? scoutRecords[matchrecords[key].RED1.scoutKey]?.secondShiftLauches : 0,
                        endgameLaunches: scoutRecords[matchrecords[key].RED1.scoutKey]?.endgameLaunches ? scoutRecords[matchrecords[key].RED1.scoutKey]?.endgameLaunches : 0,
                        robotDied: scoutRecords[matchrecords[key].RED1.scoutKey]?.robotDied ? scoutRecords[matchrecords[key].RED1.scoutKey]?.robotDied : 0,
                        robotBroke: scoutRecords[matchrecords[key].RED1.scoutKey]?.robotBroke ? scoutRecords[matchrecords[key].RED1.scoutKey]?.robotBroke : 0,
                        passHeard: scoutRecords[matchrecords[key].RED1.scoutKey]?.passHeard ? scoutRecords[matchrecords[key].RED1.scoutKey]?.passHeard : 0,
                        passLaunched: scoutRecords[matchrecords[key].RED1.scoutKey]?.passLaunched ? scoutRecords[matchrecords[key].RED1.scoutKey]?.passLaunched : 0,
                        scoutKey: matchrecords[key].RED1.scoutKey,
                    },
                    RED2: {
                        teamNumber: matchrecords[key].RED2.teamNumber,
                        AutoClimb: matchResult.alliances[1].autoTowerRobot2 === 'None' ? 0 : 15,
                        Endgame: matchResult.alliances[1].endGameTowerRobot2 === 'None' ? 0 : matchResult.alliances[0].endGameTowerRobot3 === 'Level1' ? 10 : matchResult.alliances[0].endGameTowerRobot3 === 'Level2' ? 20 : 30,
                        Teleop: matchResult.alliances[1].totalTeleopPoints,
                        Total: matchResult.alliances[1].totalPoints,
                        AutoFuel: redallianceTotals.autoFuel,
                        FirstShiftFuel: redallianceTotals.firstShiftFuel,
                        SecondShiftFuel: redallianceTotals.secondShiftFuel,
                        EndgameFuel: redallianceTotals.endgameFuel,
                        TeleopFuel: redallianceTotals.teleopFuel,
                        TotalFuel: redallianceTotals.totalFuel,
                        UncountedFuel: redallianceTotals.uncountedFuel,
                        scouted: scoutRecords[matchrecords[key].RED2.scoutKey]?.teamNumber ? true : false,
                        autoLaunches: scoutRecords[matchrecords[key].RED2.scoutKey]?.autoLaunches ? scoutRecords[matchrecords[key].RED2.scoutKey]?.autoLaunches : 0,
                        firstShiftLauches: scoutRecords[matchrecords[key].RED2.scoutKey]?.firstShiftLauches ? scoutRecords[matchrecords[key].RED2.scoutKey]?.firstShiftLauches : 0,
                        secondShiftLauches: scoutRecords[matchrecords[key].RED2.scoutKey]?.secondShiftLauches ? scoutRecords[matchrecords[key].RED2.scoutKey]?.secondShiftLauches : 0,
                        endgameLaunches: scoutRecords[matchrecords[key].RED2.scoutKey]?.endgameLaunches ? scoutRecords[matchrecords[key].RED2.scoutKey]?.endgameLaunches : 0,
                        robotDied: scoutRecords[matchrecords[key].RED2.scoutKey]?.robotDied ? scoutRecords[matchrecords[key].RED2.scoutKey]?.robotDied : 0,
                        robotBroke: scoutRecords[matchrecords[key].RED2.scoutKey]?.robotBroke ? scoutRecords[matchrecords[key].RED2.scoutKey]?.robotBroke : 0,
                        passHeard: scoutRecords[matchrecords[key].RED2.scoutKey]?.passHeard ? scoutRecords[matchrecords[key].RED2.scoutKey]?.passHeard : 0,
                        passLaunched: scoutRecords[matchrecords[key].RED2.scoutKey]?.passLaunched ? scoutRecords[matchrecords[key].RED2.scoutKey]?.passLaunched : 0,
                        scoutKey: matchrecords[key].RED2.scoutKey,
                    },
                    RED3: {
                        
                        AutoClimb: matchResult.alliances[1].autoTowerRobot3 === 'None' ? 0 : 15,
                        Endgame: matchResult.alliances[1].endGameTowerRobot3 === 'None' ? 0 : matchResult.alliances[0].endGameTowerRobot3 === 'Level1' ? 10 : matchResult.alliances[0].endGameTowerRobot3 === 'Level2' ? 20 : 30,
                        Teleop: matchResult.alliances[1].totalTeleopPoints,
                        Total: matchResult.alliances[1].totalPoints,
                        AutoFuel: redallianceTotals.autoFuel,
                        FirstShiftFuel: redallianceTotals.firstShiftFuel,
                        SecondShiftFuel: redallianceTotals.secondShiftFuel,
                        EndgameFuel: redallianceTotals.endgameFuel,
                        TeleopFuel: redallianceTotals.teleopFuel,
                        TotalFuel: redallianceTotals.totalFuel,
                        UncountedFuel: redallianceTotals.uncountedFuel,
                        scouted: scoutRecords[matchrecords[key].RED3.scoutKey]?.teamNumber ? true : false,
                        autoLaunches: scoutRecords[matchrecords[key].RED3.scoutKey]?.autoLaunches ? scoutRecords[matchrecords[key].RED3.scoutKey]?.autoLaunches : 0,
                        firstShiftLauches: scoutRecords[matchrecords[key].RED3.scoutKey]?.firstShiftLauches ? scoutRecords[matchrecords[key].RED3.scoutKey]?.firstShiftLauches : 0,
                        secondShiftLauches: scoutRecords[matchrecords[key].RED3.scoutKey]?.secondShiftLauches ? scoutRecords[matchrecords[key].RED3.scoutKey]?.secondShiftLauches : 0,
                        endgameLaunches: scoutRecords[matchrecords[key].RED3.scoutKey]?.endgameLaunches ? scoutRecords[matchrecords[key].RED3.scoutKey]?.endgameLaunches : 0,
                        robotDied: scoutRecords[matchrecords[key].RED3.scoutKey]?.robotDied ? scoutRecords[matchrecords[key].RED3.scoutKey]?.robotDied : 0,
                        robotBroke: scoutRecords[matchrecords[key].RED3.scoutKey]?.robotBroke ? scoutRecords[matchrecords[key].RED3.scoutKey]?.robotBroke : 0,
                        passHeard: scoutRecords[matchrecords[key].RED3.scoutKey]?.passHeard ? scoutRecords[matchrecords[key].RED3.scoutKey]?.passHeard : 0,
                        passLaunched: scoutRecords[matchrecords[key].RED3.scoutKey]?.passLaunched ? scoutRecords[matchrecords[key].RED3.scoutKey]?.passLaunched : 0,
                        scoutKey: matchrecords[key].RED3.scoutKey,
                    },
                    BLUE1: {
                        teamNumber: matchrecords[key].BLUE1.teamNumber,
                        AutoClimb: matchResult.alliances[0].autoTowerRobot1 === 'None' ? 0 : 15,
                        Endgame: matchResult.alliances[0].endGameTowerRobot1 === 'None' ? 0 : matchResult.alliances[0].endGameTowerRobot3 === 'Level1' ? 10 : matchResult.alliances[0].endGameTowerRobot3 === 'Level2' ? 20 : 30,
                        Teleop: matchResult.alliances[0].totalTeleopPoints,
                        Total: matchResult.alliances[0].totalPoints,
                        AutoFuel: blueallianceTotals.autoFuel,
                        FirstShiftFuel: blueallianceTotals.firstShiftFuel,
                        SecondShiftFuel: blueallianceTotals.secondShiftFuel,
                        EndgameFuel: blueallianceTotals.endgameFuel,
                        TeleopFuel: blueallianceTotals.teleopFuel,
                        TotalFuel: blueallianceTotals.totalFuel,
                        UncountedFuel: blueallianceTotals.uncountedFuel,
                        scouted: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.teamNumber ? true : false,
                        autoLaunches: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.autoLaunches ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.autoLaunches : 0,
                        firstShiftLauches: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.firstShiftLauches ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.firstShiftLauches : 0,
                        secondShiftLauches: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.secondShiftLauches ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.secondShiftLauches : 0,
                        endgameLaunches: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.endgameLaunches ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.endgameLaunches : 0,
                        robotDied: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.robotDied ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.robotDied : 0,
                        robotBroke: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.robotBroke ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.robotBroke : 0,
                        passHeard: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.passHeard ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.passHeard : 0,
                        passLaunched: scoutRecords[matchrecords[key].BLUE1.scoutKey]?.passLaunched ? scoutRecords[matchrecords[key].BLUE1.scoutKey]?.passLaunched : 0,
                        scoutKey: matchrecords[key].BLUE1.scoutKey,
                    },
                    BLUE2: {
                        teamNumber: matchrecords[key].BLUE2.teamNumber,
                        AutoClimb: matchResult.alliances[0].autoTowerRobot2 === 'None' ? 0 : 15,
                        Endgame: matchResult.alliances[0].endGameTowerRobot2 === 'None' ? 0 : matchResult.alliances[0].endGameTowerRobot3 === 'Level1' ? 10 : matchResult.alliances[0].endGameTowerRobot3 === 'Level2' ? 20 : 30,
                        Teleop: matchResult.alliances[0].totalTeleopPoints,
                        Total: matchResult.alliances[0].totalPoints,
                        AutoFuel: blueallianceTotals.autoFuel,
                        FirstShiftFuel: blueallianceTotals.firstShiftFuel,
                        SecondShiftFuel: blueallianceTotals.secondShiftFuel,
                        EndgameFuel: blueallianceTotals.endgameFuel,
                        TeleopFuel: blueallianceTotals.teleopFuel,
                        TotalFuel: blueallianceTotals.totalFuel,
                        UncountedFuel: blueallianceTotals.uncountedFuel,
                        scouted: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.teamNumber ? true : false,
                        autoLaunches: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.autoLaunches ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.autoLaunches : 0,
                        firstShiftLauches: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.firstShiftLauches ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.firstShiftLauches : 0,
                        secondShiftLauches: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.secondShiftLauches ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.secondShiftLauches : 0,
                        endgameLaunches: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.endgameLaunches ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.endgameLaunches : 0,
                        robotDied: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.robotDied ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.robotDied : 0,
                        robotBroke: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.robotBroke ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.robotBroke : 0,
                        passHeard: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.passHeard ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.passHeard : 0,
                        passLaunched: scoutRecords[matchrecords[key].BLUE2.scoutKey]?.passLaunched ? scoutRecords[matchrecords[key].BLUE2.scoutKey]?.passLaunched : 0,
                        scoutKey: matchrecords[key].BLUE2.scoutKey,
                    },
                    BLUE3: {
                        teamNumber: matchrecords[key].BLUE3.teamNumber,
                        AutoClimb: matchResult.alliances[0].autoTowerRobot3 === 'None' ? 0 : 15,
                        Endgame: matchResult.alliances[0].endGameTowerRobot3 === 'None' ? 0 : matchResult.alliances[0].endGameTowerRobot3 === 'Level1' ? 10 : matchResult.alliances[0].endGameTowerRobot3 === 'Level2' ? 20 : 30,
                        Teleop: matchResult.alliances[0].totalTeleopPoints,
                        Total: matchResult.alliances[0].totalPoints,
                        AutoFuel: blueallianceTotals.autoFuel,
                        FirstShiftFuel: blueallianceTotals.firstShiftFuel,
                        SecondShiftFuel: blueallianceTotals.secondShiftFuel,
                        EndgameFuel: blueallianceTotals.endgameFuel,
                        TeleopFuel: blueallianceTotals.teleopFuel,
                        TotalFuel: blueallianceTotals.totalFuel,
                        UncountedFuel: blueallianceTotals.uncountedFuel,
                        scouted: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.teamNumber ? true : false,
                        autoLaunches: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.autoLaunches ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.autoLaunches : 0,
                        firstShiftLauches: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.firstShiftLauches ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.firstShiftLauches : 0,
                        secondShiftLauches: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.secondShiftLauches ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.secondShiftLauches : 0,
                        endgameLaunches: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.endgameLaunches ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.endgameLaunches : 0,
                        robotDied: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.robotDied ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.robotDied : 0,
                        robotBroke: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.robotBroke ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.robotBroke : 0,
                        passHeard: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.passHeard ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.passHeard : 0,
                        passLaunched: scoutRecords[matchrecords[key].BLUE3.scoutKey]?.passLaunched ? scoutRecords[matchrecords[key].BLUE3.scoutKey]?.passLaunched : 0,
                        scoutKey: matchrecords[key].BLUE3.scoutKey,
                    },
                }
            }


            const summaryRecords = [];
                let aloneSifts = 0
                let aloneSiftFuel = 0
                let aloneSiftLaunches = 0
            for (const key of Object.keys(proccessedrecords)) {
                const processedMatch = proccessedrecords[key];
                if (processedMatch.RED1.scouted && processedMatch.RED2.scouted && processedMatch.RED3.scouted) {
                    const TotalAutoLaunches = processedMatch.RED1.autoLaunches + processedMatch.RED2.autoLaunches + processedMatch.RED3.autoLaunches;
                    const TotalFirstShiftLauches = processedMatch.RED1.firstShiftLauches + processedMatch.RED2.firstShiftLauches + processedMatch.RED3.firstShiftLauches;
                    const TotalSecondShiftLauches = processedMatch.RED1.secondShiftLauches + processedMatch.RED2.secondShiftLauches + processedMatch.RED3.secondShiftLauches;
                    const TotalEndgameLaunches = processedMatch.RED1.endgameLaunches + processedMatch.RED2.endgameLaunches + processedMatch.RED3.endgameLaunches;

                    const autoAVGLaunch = processedMatch.RED1.AutoFuel / TotalAutoLaunches;
                    const firstShiftAVGLaunch = processedMatch.RED1.FirstShiftFuel / TotalFirstShiftLauches;
                    const secondShiftAVGLaunch = processedMatch.RED1.SecondShiftFuel / TotalSecondShiftLauches;
                    const endgameAVGLaunch = processedMatch.RED1.EndgameFuel / TotalEndgameLaunches;

                    processedMatch.RED1.autoAJDFuel =  autoAVGLaunch * processedMatch.RED1.autoLaunches;
                    if (TotalAutoLaunches === processedMatch.RED1.autoLaunches) { processedMatch.RED1.autoAlone = true } else { processedMatch.RED1.autoAlone = false }
                    processedMatch.RED1.firstShiftAJDFuel = firstShiftAVGLaunch * processedMatch.RED1.firstShiftLauches;
                    if (TotalFirstShiftLauches === processedMatch.RED1.firstShiftLauches) { processedMatch.RED1.firstShiftAlone = true } else { processedMatch.RED1.firstShiftAlone = false }
                    processedMatch.RED1.secondShiftAJDFuel = secondShiftAVGLaunch * processedMatch.RED1.secondShiftLauches;
                    if (TotalSecondShiftLauches === processedMatch.RED1.secondShiftLauches) { processedMatch.RED1.secondShiftAlone = true } else { processedMatch.RED1.secondShiftAlone = false }
                    processedMatch.RED1.endgameAJDFuel = endgameAVGLaunch * processedMatch.RED1.endgameLaunches;
                    if (TotalEndgameLaunches === processedMatch.RED1.endgameLaunches) { processedMatch.RED1.endgameAlone = true } else { processedMatch.RED1.endgameAlone = false }
                    processedMatch.RED1.totalADJFuel = Math.ceil(processedMatch.RED1.autoAJDFuel + processedMatch.RED1.firstShiftAJDFuel + processedMatch.RED1.secondShiftAJDFuel + processedMatch.RED1.endgameAJDFuel);
                    processedMatch.RED1.totalLaunches = processedMatch.RED1.autoLaunches + processedMatch.RED1.firstShiftLauches + processedMatch.RED1.secondShiftLauches + processedMatch.RED1.endgameLaunches;

                    aloneSifts = 0
                    aloneSiftFuel = 0
                    aloneSiftLaunches = 0
                    if (processedMatch.RED1.autoAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED1.autoAJDFuel ; aloneSiftLaunches += processedMatch.RED1.autoLaunches }
                    if (processedMatch.RED1.firstShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED1.firstShiftAJDFuel ; aloneSiftLaunches += processedMatch.RED1.firstShiftLauches }
                    if (processedMatch.RED1.secondShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED1.secondShiftAJDFuel ; aloneSiftLaunches += processedMatch.RED1.secondShiftLauches }
                    if (processedMatch.RED1.endgameAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED1.endgameAJDFuel ; aloneSiftLaunches += processedMatch.RED1.endgameLaunches }
                    processedMatch.RED1.totalAloneSifts = aloneSifts
                    processedMatch.RED1.totalAloneSiftFuel = aloneSiftFuel
                    processedMatch.RED1.totalAloneSiftLaunches = aloneSiftLaunches
                    if (aloneSifts > 0) { 
                        processedMatch.RED1.avgFuelPerLaunch = Math.ceil(aloneSiftFuel / aloneSiftLaunches)
                    }



                    processedMatch.RED2.autoAJDFuel =  autoAVGLaunch * processedMatch.RED2.autoLaunches;
                    if (TotalAutoLaunches === processedMatch.RED2.autoLaunches) { processedMatch.RED2.autoAlone = true } else { processedMatch.RED2.autoAlone = false }
                    processedMatch.RED2.firstShiftAJDFuel = firstShiftAVGLaunch * processedMatch.RED2.firstShiftLauches;
                    if (TotalFirstShiftLauches === processedMatch.RED2.firstShiftLauches) { processedMatch.RED2.firstShiftAlone = true } else { processedMatch.RED2.firstShiftAlone = false }
                    processedMatch.RED2.secondShiftAJDFuel = secondShiftAVGLaunch * processedMatch.RED2.secondShiftLauches;
                    if (TotalSecondShiftLauches === processedMatch.RED2.secondShiftLauches) { processedMatch.RED2.secondShiftAlone = true } else { processedMatch.RED2.secondShiftAlone = false }
                    processedMatch.RED2.endgameAJDFuel = endgameAVGLaunch * processedMatch.RED2.endgameLaunches;
                    if (TotalEndgameLaunches === processedMatch.RED2.endgameLaunches) { processedMatch.RED2.endgameAlone = true } else { processedMatch.RED2.endgameAlone = false }
                    processedMatch.RED2.totalADJFuel = Math.ceil(processedMatch.RED2.autoAJDFuel + processedMatch.RED2.firstShiftAJDFuel + processedMatch.RED2.secondShiftAJDFuel + processedMatch.RED2.endgameAJDFuel);
                    processedMatch.RED2.totalLaunches = processedMatch.RED2.autoLaunches + processedMatch.RED2.firstShiftLauches + processedMatch.RED2.secondShiftLauches + processedMatch.RED2.endgameLaunches;

                    aloneSifts = 0
                    aloneSiftFuel = 0
                    aloneSiftLaunches = 0
                    if (processedMatch.RED2.autoAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED2.autoAJDFuel ; aloneSiftLaunches += processedMatch.RED2.autoLaunches }
                    if (processedMatch.RED2.firstShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED2.firstShiftAJDFuel ; aloneSiftLaunches += processedMatch.RED2.firstShiftLauches }
                    if (processedMatch.RED2.secondShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED2.secondShiftAJDFuel ; aloneSiftLaunches += processedMatch.RED2.secondShiftLauches }
                    if (processedMatch.RED2.endgameAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED2.endgameAJDFuel ; aloneSiftLaunches += processedMatch.RED2.endgameLaunches }
                    processedMatch.RED2.totalAloneSifts = aloneSifts
                    processedMatch.RED2.totalAloneSiftFuel = aloneSiftFuel
                    processedMatch.RED2.totalAloneSiftLaunches = aloneSiftLaunches
                    if (aloneSifts > 0) { 
                        processedMatch.RED2.avgFuelPerLaunch = Math.ceil(aloneSiftFuel / aloneSiftLaunches)
                    }


                    processedMatch.RED3.autoAJDFuel =  autoAVGLaunch * processedMatch.RED3.autoLaunches;
                    if (TotalAutoLaunches === processedMatch.RED3.autoLaunches) { processedMatch.RED3.autoAlone = true } else { processedMatch.RED3.autoAlone = false }
                    processedMatch.RED3.firstShiftAJDFuel = firstShiftAVGLaunch * processedMatch.RED3.firstShiftLauches;
                    if (TotalFirstShiftLauches === processedMatch.RED3.firstShiftLauches) { processedMatch.RED3.firstShiftAlone = true } else { processedMatch.RED3.firstShiftAlone = false }
                    processedMatch.RED3.secondShiftAJDFuel = secondShiftAVGLaunch * processedMatch.RED3.secondShiftLauches;
                    if (TotalSecondShiftLauches === processedMatch.RED3.secondShiftLauches) { processedMatch.RED3.secondShiftAlone = true } else { processedMatch.RED3.secondShiftAlone = false }
                    processedMatch.RED3.endgameAJDFuel = endgameAVGLaunch * processedMatch.RED3.endgameLaunches;
                    if (TotalEndgameLaunches === processedMatch.RED3.endgameLaunches) { processedMatch.RED3.endgameAlone = true } else { processedMatch.RED3.endgameAlone = false }
                    processedMatch.RED3.totalADJFuel = Math.ceil(processedMatch.RED3.autoAJDFuel + processedMatch.RED3.firstShiftAJDFuel + processedMatch.RED3.secondShiftAJDFuel + processedMatch.RED3.endgameAJDFuel);
                    processedMatch.RED3.totalLaunches = processedMatch.RED3.autoLaunches + processedMatch.RED3.firstShiftLauches + processedMatch.RED3.secondShiftLauches + processedMatch.RED3.endgameLaunches;

                    aloneSifts = 0
                    aloneSiftFuel = 0
                    aloneSiftLaunches = 0
                    if (processedMatch.RED3.autoAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED3.autoAJDFuel ; aloneSiftLaunches += processedMatch.RED3.autoLaunches }
                    if (processedMatch.RED3.firstShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED3.firstShiftAJDFuel ; aloneSiftLaunches += processedMatch.RED3.firstShiftLauches }
                    if (processedMatch.RED3.secondShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED3.secondShiftAJDFuel ; aloneSiftLaunches += processedMatch.RED3.secondShiftLauches }
                    if (processedMatch.RED3.endgameAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.RED3.endgameAJDFuel ; aloneSiftLaunches += processedMatch.RED3.endgameLaunches }
                    processedMatch.RED3.totalAloneSifts = aloneSifts
                    processedMatch.RED3.totalAloneSiftFuel = aloneSiftFuel
                    processedMatch.RED3.totalAloneSiftLaunches = aloneSiftLaunches
                    if (aloneSifts > 0) { 
                        processedMatch.RED3.avgFuelPerLaunch = Math.ceil(aloneSiftFuel / aloneSiftLaunches)
                    }

                }

                if (processedMatch.BLUE1.scouted && processedMatch.BLUE2.scouted && processedMatch.BLUE3.scouted) {
                    const TotalAutoLaunches = processedMatch.BLUE1.autoLaunches + processedMatch.BLUE2.autoLaunches + processedMatch.BLUE3.autoLaunches;
                    const TotalFirstShiftLauches = processedMatch.BLUE1.firstShiftLauches + processedMatch.BLUE2.firstShiftLauches + processedMatch.BLUE3.firstShiftLauches;
                    const TotalSecondShiftLauches = processedMatch.BLUE1.secondShiftLauches + processedMatch.BLUE2.secondShiftLauches + processedMatch.BLUE3.secondShiftLauches;
                    const TotalEndgameLaunches = processedMatch.BLUE1.endgameLaunches + processedMatch.BLUE2.endgameLaunches + processedMatch.BLUE3.endgameLaunches;

                    const autoAVGLaunch = processedMatch.BLUE1.AutoFuel / TotalAutoLaunches;
                    const firstShiftAVGLaunch = processedMatch.BLUE1.FirstShiftFuel / TotalFirstShiftLauches;
                    const secondShiftAVGLaunch = processedMatch.BLUE1.SecondShiftFuel / TotalSecondShiftLauches;
                    const endgameAVGLaunch = processedMatch.BLUE1.EndgameFuel / TotalEndgameLaunches;

                    processedMatch.BLUE1.autoAJDFuel =  autoAVGLaunch * processedMatch.BLUE1.autoLaunches;
                    if (TotalAutoLaunches === processedMatch.BLUE1.autoLaunches) { processedMatch.BLUE1.autoAlone = true } else { processedMatch.BLUE1.autoAlone = false }
                    processedMatch.BLUE1.firstShiftAJDFuel = firstShiftAVGLaunch * processedMatch.BLUE1.firstShiftLauches;
                    if (TotalFirstShiftLauches === processedMatch.BLUE1.firstShiftLauches) { processedMatch.BLUE1.firstShiftAlone = true } else { processedMatch.BLUE1.firstShiftAlone = false }
                    processedMatch.BLUE1.secondShiftAJDFuel = secondShiftAVGLaunch * processedMatch.BLUE1.secondShiftLauches;
                    if (TotalSecondShiftLauches === processedMatch.BLUE1.secondShiftLauches) { processedMatch.BLUE1.secondShiftAlone = true } else { processedMatch.BLUE1.secondShiftAlone = false }
                    processedMatch.BLUE1.endgameAJDFuel = endgameAVGLaunch * processedMatch.BLUE1.endgameLaunches;
                    if (TotalEndgameLaunches === processedMatch.BLUE1.endgameLaunches) { processedMatch.BLUE1.endgameAlone = true } else { processedMatch.BLUE1.endgameAlone = false }
                    processedMatch.BLUE1.totalADJFuel = Math.ceil(processedMatch.BLUE1.autoAJDFuel + processedMatch.BLUE1.firstShiftAJDFuel + processedMatch.BLUE1.secondShiftAJDFuel + processedMatch.BLUE1.endgameAJDFuel);
                    processedMatch.BLUE1.totalLaunches = processedMatch.BLUE1.autoLaunches + processedMatch.BLUE1.firstShiftLauches + processedMatch.BLUE1.secondShiftLauches + processedMatch.BLUE1.endgameLaunches;

                    aloneSifts = 0
                    aloneSiftFuel = 0
                    aloneSiftLaunches = 0
                    if (processedMatch.BLUE1.autoAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE1.autoAJDFuel ; aloneSiftLaunches += processedMatch.BLUE1.autoLaunches }
                    if (processedMatch.BLUE1.firstShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE1.firstShiftAJDFuel ; aloneSiftLaunches += processedMatch.BLUE1.firstShiftLauches }
                    if (processedMatch.BLUE1.secondShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE1.secondShiftAJDFuel ; aloneSiftLaunches += processedMatch.BLUE1.secondShiftLauches }
                    if (processedMatch.BLUE1.endgameAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE1.endgameAJDFuel ; aloneSiftLaunches += processedMatch.BLUE1.endgameLaunches }
                    processedMatch.BLUE1.totalAloneSifts = aloneSifts
                    processedMatch.BLUE1.totalAloneSiftFuel = aloneSiftFuel
                    processedMatch.BLUE1.totalAloneSiftLaunches = aloneSiftLaunches
                    if (aloneSifts > 0) { 
                        processedMatch.BLUE1.avgFuelPerLaunch = Math.ceil(aloneSiftFuel / aloneSiftLaunches)
                    }


                    processedMatch.BLUE2.autoAJDFuel =  autoAVGLaunch * processedMatch.BLUE2.autoLaunches;
                    if (TotalAutoLaunches === processedMatch.BLUE2.autoLaunches) { processedMatch.BLUE2.autoAlone = true } else { processedMatch.BLUE2.autoAlone = false }
                    processedMatch.BLUE2.firstShiftAJDFuel = firstShiftAVGLaunch * processedMatch.BLUE2.firstShiftLauches;
                    if (TotalFirstShiftLauches === processedMatch.BLUE2.firstShiftLauches) { processedMatch.BLUE2.firstShiftAlone = true } else { processedMatch.BLUE2.firstShiftAlone = false }
                    processedMatch.BLUE2.secondShiftAJDFuel = secondShiftAVGLaunch * processedMatch.BLUE2.secondShiftLauches;
                    if (TotalSecondShiftLauches === processedMatch.BLUE2.secondShiftLauches) { processedMatch.BLUE2.secondShiftAlone = true } else { processedMatch.BLUE2.secondShiftAlone = false }
                    processedMatch.BLUE2.endgameAJDFuel = endgameAVGLaunch * processedMatch.BLUE2.endgameLaunches;
                    if (TotalEndgameLaunches === processedMatch.BLUE2.endgameLaunches) { processedMatch.BLUE2.endgameAlone = true } else { processedMatch.BLUE2.endgameAlone = false }
                    processedMatch.BLUE2.totalADJFuel = Math.ceil(processedMatch.BLUE2.autoAJDFuel + processedMatch.BLUE2.firstShiftAJDFuel + processedMatch.BLUE2.secondShiftAJDFuel + processedMatch.BLUE2.endgameAJDFuel);
                    processedMatch.BLUE2.totalLaunches = processedMatch.BLUE2.autoLaunches + processedMatch.BLUE2.firstShiftLauches + processedMatch.BLUE2.secondShiftLauches + processedMatch.BLUE2.endgameLaunches;

                    aloneSifts = 0
                    aloneSiftFuel = 0
                    aloneSiftLaunches = 0
                    if (processedMatch.BLUE2.autoAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE2.autoAJDFuel ; aloneSiftLaunches += processedMatch.BLUE2.autoLaunches }
                    if (processedMatch.BLUE2.firstShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE2.firstShiftAJDFuel ; aloneSiftLaunches += processedMatch.BLUE2.firstShiftLauches }
                    if (processedMatch.BLUE2.secondShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE2.secondShiftAJDFuel ; aloneSiftLaunches += processedMatch.BLUE2.secondShiftLauches }
                    if (processedMatch.BLUE2.endgameAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE2.endgameAJDFuel ; aloneSiftLaunches += processedMatch.BLUE2.endgameLaunches }
                    processedMatch.BLUE2.totalAloneSifts = aloneSifts
                    processedMatch.BLUE2.totalAloneSiftFuel = aloneSiftFuel
                    processedMatch.BLUE2.totalAloneSiftLaunches = aloneSiftLaunches
                    if (aloneSifts > 0) { 
                        processedMatch.BLUE2.avgFuelPerLaunch = Math.ceil(aloneSiftFuel / aloneSiftLaunches)
                    }


                    processedMatch.BLUE3.autoAJDFuel =  autoAVGLaunch * processedMatch.BLUE3.autoLaunches;
                    if (TotalAutoLaunches === processedMatch.BLUE3.autoLaunches) { processedMatch.BLUE3.autoAlone = true } else { processedMatch.BLUE3.autoAlone = false }
                    processedMatch.BLUE3.firstShiftAJDFuel = firstShiftAVGLaunch * processedMatch.BLUE3.firstShiftLauches;
                    if (TotalFirstShiftLauches === processedMatch.BLUE3.firstShiftLauches) { processedMatch.BLUE3.firstShiftAlone = true } else { processedMatch.BLUE3.firstShiftAlone = false }
                    processedMatch.BLUE3.secondShiftAJDFuel = secondShiftAVGLaunch * processedMatch.BLUE3.secondShiftLauches;
                    if (TotalSecondShiftLauches === processedMatch.BLUE3.secondShiftLauches) { processedMatch.BLUE3.secondShiftAlone = true } else { processedMatch.BLUE3.secondShiftAlone = false }
                    processedMatch.BLUE3.endgameAJDFuel = endgameAVGLaunch * processedMatch.BLUE3.endgameLaunches;
                    if (TotalEndgameLaunches === processedMatch.BLUE3.endgameLaunches) { processedMatch.BLUE3.endgameAlone = true } else { processedMatch.BLUE3.endgameAlone = false }
                    processedMatch.BLUE3.totalADJFuel = Math.ceil(processedMatch.BLUE3.autoAJDFuel + processedMatch.BLUE3.firstShiftAJDFuel + processedMatch.BLUE3.secondShiftAJDFuel + processedMatch.BLUE3.endgameAJDFuel);
                    processedMatch.BLUE3.totalLaunches = processedMatch.BLUE3.autoLaunches + processedMatch.BLUE3.firstShiftLauches + processedMatch.BLUE3.secondShiftLauches + processedMatch.BLUE3.endgameLaunches;

                    aloneSifts = 0
                    aloneSiftFuel = 0
                    aloneSiftLaunches = 0
                    if (processedMatch.BLUE3.autoAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE3.autoAJDFuel ; aloneSiftLaunches += processedMatch.BLUE3.autoLaunches }
                    if (processedMatch.BLUE3.firstShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE3.firstShiftAJDFuel ; aloneSiftLaunches += processedMatch.BLUE3.firstShiftLauches }
                    if (processedMatch.BLUE3.secondShiftAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE3.secondShiftAJDFuel ; aloneSiftLaunches += processedMatch.BLUE3.secondShiftLauches }
                    if (processedMatch.BLUE3.endgameAlone) { aloneSifts++ ; aloneSiftFuel += processedMatch.BLUE3.endgameAJDFuel ; aloneSiftLaunches += processedMatch.BLUE3.endgameLaunches }
                    processedMatch.BLUE3.totalAloneSifts = aloneSifts                    
                    processedMatch.BLUE3.totalAloneSiftFuel = aloneSiftFuel
                    processedMatch.BLUE3.totalAloneSiftLaunches = aloneSiftLaunches
                    if (aloneSifts > 0) { 
                        processedMatch.BLUE3.avgFuelPerLaunch = Math.ceil(aloneSiftFuel / aloneSiftLaunches)
                    }

                }

                const saveRed1 = await storeMatchSummary(processedMatch.RED1);
                const saveRed2 = await storeMatchSummary(processedMatch.RED2);
                const saveRed3 = await storeMatchSummary(processedMatch.RED3);
                const saveBlue1 = await storeMatchSummary(processedMatch.BLUE1);
                const saveBlue2 = await storeMatchSummary(processedMatch.BLUE2);
                const saveBlue3 = await storeMatchSummary(processedMatch.BLUE3);
            }



            
        
        
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Error retrieving match results, schedule, and scouts for the event ' + event });
        }

    }

    return NextResponse.json(events);

}