'use client'

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

import { CircleX } from 'lucide-react';
import PitScoutForm from '@/components/scout/PitScoutForm';

interface Props {
    setDisplay: (page: string) => void
}

const ScoutPit = ({setDisplay}: Props) => {
    const { appEvent } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [teamNumber, setTeamNumber] = useState('');
    
    const handleScoutPit = (teamNumber: string) => {
        setTeamNumber(teamNumber);
        setShowForm(true);
    }


    return (
        <div className="flex flex-col w-screen text-xs gap-2">
            <h1>Scout Pit Page</h1>

            {appEvent?.teams.map((team, index) => (
                <div key={index} className="flex flex-col w-3/4 p-4 bg-neutral-800 text-white rounded-xl text-lg font-bold">
                    <button onClick={(() => handleScoutPit(team.number))}>{team.number} {team.name}</button>
                </div>))
            }

        {showForm && 
            <div className="fixed top-0 left-0 w-screen h-full z-100 p-4 bg-neutral-800 text-white text-xs font-bold">
                <div className="grid grid-cols-[4fr_1fr] justify-between">
                    <div className="p-2 text-left folt-bold text-lg">Scout Pit Form for Team {teamNumber}</div>
                    <div className="p-2 text-right"><button onClick={(() => setShowForm(false))}><CircleX /></button></div>
                </div>
                {appEvent?.code &&
                <PitScoutForm eventCode={appEvent?.code} teamNumber={teamNumber} />
                }

                
            </div>
        }


        </div>
    )
}

export default ScoutPit;