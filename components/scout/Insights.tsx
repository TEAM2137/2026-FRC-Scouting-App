'use client'

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { IMatchSummary } from '@/models/insights/MatchSummary';
import { IMatchScout } from '@/models/scout/MatchScout';
import { CircleX } from 'lucide-react';


import { getEventScoutedMatches } from '@/lib/scout/getEventScoutMatches';


interface ITeamSummary  {
    teamNumber: string,
    avgTotalFuel: number,
    avgAutoFuel: number,
    avgFirstShiftFuel: number,
    avgSecondShiftFuel: number,
    avgEndgameFuel: number,
    avgTeleopFuel: number,
    avgAutoClimb: number,
    avgEndgameClimb: number,
    totalMatches: number,
    adjMatches: number,
    adjAvgAutoFuel: number,
    adjAvgFirstShiftFuel: number,
    adjAvgSecondShiftFuel: number,
    adjAvgEndgameFuel: number,
    adjAvgTeleopFuel: number,
}


interface Props {
    eventCode: string,
    setDisplay: (page: string) => void
}

const ScoutInsights = ({eventCode, setDisplay}: Props) => {
    const { appEvent } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [teamNumber, setTeamNumber] = useState('');
    const [matchSummaries, setMatchSummaries] = useState<IMatchSummary[]>([]);
    const [teamSummaries, setTeamSummaries] = useState<ITeamSummary[]>([]);
    const [scoutedMatches, setScoutedMatches] = useState<IMatchScout[]>([]);
    const [teams, setTeams] = useState<string[]>([]);

    useEffect(() => {
        const fetchMatchSummaries = async () => {
            const Matches = await getEventScoutedMatches(eventCode);   
            if (Matches !== null) {
                const matches = JSON.parse(Matches);
                setScoutedMatches(matches);
                const getteams: string[] = []
                for (const match of matches) {
                    if (!getteams.includes(match.teamNumber)) {
                        getteams.push(match.teamNumber);
                    }
                }
                setTeams(getteams);
            }

        }
        fetchMatchSummaries();
    }, []);
    


    const handleCloseForm = () => {
        setShowForm(false);
    }


    return (
        <div className="flex flex-col w-screen text-xs gap-2">
            <div>{teams.length} Teams | {scoutedMatches.length} Matches</div>
            {teams && teams.sort((a, b) => parseInt(a) - parseInt(b)).map((team, index) => (
                <div key={index} className="flex flex-col w-3/4 p-4 bg-neutral-800 text-white rounded-xl text-lg font-bold">
                    <div>{team}</div>
                    <div className="grid grid-cols-[70px_30px_15px_10px_15px_15px_15px_15px_10px_15px_15px_10px_15px_15px]   bg-neutral-900 text-white  text-[8px] font-bold">
                            <div>MATCH</div>
                            <div>POS</div>
                            <div>TLs</div>
                            <div>&nbsp;</div>
                            
                            <div>A</div>
                            <div>F</div>
                            <div>S</div>
                            <div>E</div>
                            <div>&nbsp;</div>
                            <div>PH</div>
                            <div>PL</div>
                            <div>&nbsp;</div>
                            <div>RD</div>
                            <div>RB</div>

                        </div>
                    {scoutedMatches.filter(matchSummary => matchSummary.teamNumber === team).sort((a, b) => parseInt(a.matchNumber) - parseInt(b.matchNumber)).map((matchSummary, index) => (
                        <div key={index} className="grid grid-cols-[70px_30px_15px_10px_15px_15px_15px_15px_10px_15px_15px_10px_15px_15px]   bg-neutral-900 text-white  text-[8px] font-bold">
                            <div>{matchSummary.tournamentLevel} {matchSummary.matchNumber}</div>
                            <div>{matchSummary.alliancePosition}</div>
                            <div>{matchSummary.autoLaunches + matchSummary.firstShiftLauches + matchSummary.secondShiftLauches + matchSummary.endgameLaunches}</div>
                            <div>&nbsp;</div>
                            
                            <div>{matchSummary.autoLaunches}</div>
                            <div>{matchSummary.firstShiftLauches}</div>
                            <div>{matchSummary.secondShiftLauches}</div>
                            <div>{matchSummary.endgameLaunches}</div>
                            <div>&nbsp;</div>
                            <div>{matchSummary.passHerdNeutral}</div>
                            <div>{matchSummary.passHerdOpposing}</div>
                            
                            <div>&nbsp;</div>
                            <div>{matchSummary.robotDied}</div>
                            <div>{matchSummary.robotBroke}</div>

                        </div>))}
                </div>))}
        </div>
    )
}

export default ScoutInsights;