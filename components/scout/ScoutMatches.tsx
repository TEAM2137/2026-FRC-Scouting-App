'use client'

import { useEffect, useState } from 'react';
import { IMatch } from '@/models/frc-events/Match';
import { getSchedule } from '@/lib/scout/getschedule';  

import { CircleX } from 'lucide-react';

import { Separator } from '../ui/separator';

interface Props {
    eventCode: string,
    setDisplay: (page: string) => void
}

const ScoutMatches = ({eventCode,setDisplay}: Props) => {
    const [matches, setMatches] = useState<IMatch[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [teamNumber, setTeamNumber] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            const matches = await getSchedule(eventCode);
            if (matches !== null) {
                setMatches(JSON.parse(matches));
            }
        }
        fetchMatches();
    }, []);
    
    const handleScoutMatch = (teamNumber: string) => {
        setTeamNumber(teamNumber);
        setShowForm(true);
    }


    return (
        <div className="flex flex-col w-screen text-xs gap-2">
            <h1>Scout Matches Page</h1>

            {matches.filter((match) => match.actualStartTime === null).map((match, index) => (
                <div key={index} className="flex flex-col w-3/4 p-4 bg-neutral-800 text-white text-xs rounded-xl">
                    <h2>{match.description}</h2>
                    <div className="grid grid-cols-[2fr_2fr_2fr] justify-between">
                        <div className="flex flex-col p-1 bg-red-500 rounded-xl">
                            <p className="text-center font-bold text-sm my-1" onClick={(() => handleScoutMatch(match.teams[0].teamNumber.toString()))}>{match.teams[0].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1" onClick={(() => handleScoutMatch(match.teams[1].teamNumber.toString()))}>{match.teams[1].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1" onClick={(() => handleScoutMatch(match.teams[2].teamNumber.toString()))}>{match.teams[2].teamNumber}</p>
                        </div>
                        <div className="flex flex-col">
                            {match.scoreRedFinal && <p className="text-center font-bold text-sm my-1">{match.scoreRedFinal}</p>}
                            <Separator />
                            {match.scoreBlueFinal && <p className="text-center font-bold text-sm my-1">{match.scoreBlueFinal}</p>}



                        </div>
                        <div className="flex flex-col p-1 bg-blue-500 rounded-xl">
                            <p className="text-center font-bold text-sm my-1">{match.teams[3].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1">{match.teams[4].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1">{match.teams[5].teamNumber}</p>
                        </div>

                        
                    </div>
                    
                </div>
            ))}

            <Separator />

            {matches.filter((match) => match.actualStartTime !== null).map((match, index) => (
                <div key={index} className="flex flex-col w-3/4 p-4 bg-neutral-800 text-white text-xs rounded-xl">
                    <h2>{match.description}</h2>
                    <div className="grid grid-cols-[2fr_2fr_2fr] justify-between">
                        <div className="flex flex-col p-1 bg-red-500 rounded-xl">
                            <p className="text-center font-bold text-sm my-1">{match.teams[0].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1">{match.teams[1].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1">{match.teams[2].teamNumber}</p>
                        </div>
                        <div className="flex flex-col">
                            {match.scoreRedFinal && <p className="text-center font-bold text-sm my-1">{match.scoreRedFinal}</p>}
                            <Separator />
                            {match.scoreBlueFinal && <p className="text-center font-bold text-sm my-1">{match.scoreBlueFinal}</p>}



                        </div>
                        <div className="flex flex-col p-1 bg-blue-500 rounded-xl">
                            <p className="text-center font-bold text-sm my-1">{match.teams[3].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1">{match.teams[4].teamNumber}</p>
                            <p className="text-center font-bold text-sm my-1">{match.teams[5].teamNumber}</p>
                        </div>

                        
                    </div>
                    
                </div>
            ))}




        {showForm && 
            <div className="fixed top-0 left-0 w-screen h-screen z-100 p-4 bg-neutral-800 text-white text-xs  font-bold">
                <button onClick={(() => setShowForm(false))}><CircleX /></button>
                <h1>Scout Match for Team {teamNumber}</h1>



                
            </div>
        }








        </div>
    )
}

export default ScoutMatches;