'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


// My Page is the definition of visual clutter and chaos
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { IMatchScout } from "@/models/scout/MatchScout"
import storeMatch from "@/lib/scout/storeMatch"
import getMatch from "@/lib/scout/getMatch"

interface IProps {
    teamNumber: string,
    matchNumber: string,
    eventCode: string,
    tournamentLevel: string,
    position: string,
    closeForm: () => void
}

const MatchScoutForm = ({teamNumber, matchNumber, eventCode, tournamentLevel, position, closeForm}: IProps) => {
    const router = useRouter();
    const { appEvent, setAppEvent } = useAppContext();
        const [matchData, setMatchData] = useState<IMatchScout>({
        matchID: eventCode + '-' + tournamentLevel + '-' + matchNumber.toString() + '-' + teamNumber + '-' + position,
        teamNumber: teamNumber,
        scoutTeamNumber: '',
        eventCode: eventCode,
        tournamentLevel: tournamentLevel,
        matchNumber: matchNumber,
        alliancePosition: position,
        autoLaunches: 0,
        firstShiftLauches: 0,
        secondShiftLauches: 0,
        endgameLaunches: 0,
        robotDied: 0,
        robotBroke: 0,
        passHeard: 0,
        passLaunched: 0,
    });

    useEffect(() => {
        const fetchMatchScout = async () => {
            const matchScout = await getMatch(matchData.matchID);
            if (matchScout !== null) {
                setMatchData(JSON.parse(matchScout));
            }
        }
        fetchMatchScout();
    }, []);

    useEffect(() => {
        if (matchData.passHeard < 0) {
            setMatchData({...matchData, passHeard: 0})
        }
        if (matchData.passLaunched < 0) {
            setMatchData({...matchData, passLaunched: 0})
        }
    }, [matchData])
    
    const handleStoreData = async () => {
        const response = await storeMatch(matchData);
        if (response.result) {
            closeForm();
        }
    }
    

    const increaseLaunches = (position: string) => {
        if (position === 'auto') {
            setMatchData({...matchData, autoLaunches: (matchData.autoLaunches + 1)});
        } else if (position === 'shiftone') {
            setMatchData({...matchData, firstShiftLauches: (matchData.firstShiftLauches + 1)});
        } else if (position === 'shifttwo') {
            setMatchData({...matchData, secondShiftLauches: (matchData.secondShiftLauches + 1)});
        }else if (position === 'endgame') {
            setMatchData({...matchData, endgameLaunches: (matchData.endgameLaunches + 1)});
        }
    }

    const decreaseLaunches = (position: string) => {
        if (position === 'auto' && matchData.autoLaunches > 0) {
            setMatchData({...matchData, autoLaunches: (matchData.autoLaunches - 1)});
        } else if (position === 'shiftone' && matchData.firstShiftLauches > 0) {
            setMatchData({...matchData, firstShiftLauches: (matchData.firstShiftLauches - 1)});
        } else if (position === 'shifttwo' && matchData.secondShiftLauches > 0) {
            setMatchData({...matchData, secondShiftLauches: (matchData.secondShiftLauches - 1)});
        }else if (position === 'endgame' && matchData.endgameLaunches > 0) {
            setMatchData({...matchData, endgameLaunches: (matchData.endgameLaunches - 1)});
        }
    }
    
    return (
        <div className="mt-1">
            <Card className="rounded-xl w-full h-full">
                <CardContent className="flex flex-col gap-1">
                    <div className="grid place-items-center pb-1">AUTO LAUNCHES</div>

                    <div className="grid grid-cols-3 gap-2 place-items-center bg-blue-950 rounded-lg p-2">
                    <button onClick={() => increaseLaunches('auto')} className="bg-green-600 border-3 border-green-900 rounded-2xl size-16">+1 </button>
                    <p className="font-bold text-5xl text-center"> {matchData.autoLaunches}</p>
                    <button onClick={() =>decreaseLaunches('auto')} className="bg-red-600 rounded-2xl border-3 border-red-900 size-16">-1</button>
                    </div>
                    <div className="grid place-items-center p-1">FIRST SCORING SHIFT LAUNCHES</div>
                    <div className="grid grid-cols-3 gap-2 place-items-center bg-blue-950 rounded-lg p-2">
                    <button onClick={() => increaseLaunches('shiftone')} className="bg-green-600 border-3 border-green-900 rounded-2xl size-16">+1 </button>
                    <p className="font-bold text-5xl text-center"> {matchData.firstShiftLauches}</p>
                    <button onClick={() =>decreaseLaunches('shiftone')} className="bg-red-600 rounded-2xl border-3 border-red-900 size-16">-1</button>
                    </div>
                    <div className="grid place-items-center p-1">SECOND SCORING SHIFT LAUNCHES</div>
                    <div className="grid grid-cols-3 gap-2 place-items-center bg-blue-950 rounded-lg p-2">
                    <button onClick={() => increaseLaunches('shifttwo')} className="bg-green-600 border-3 border-green-900 rounded-2xl size-16">+1 </button>
                    <p className="font-bold text-5xl text-center"> {matchData.secondShiftLauches}</p>
                    <button onClick={() =>decreaseLaunches('shifttwo')} className="bg-red-600 rounded-2xl border-3 border-red-900 size-16">-1</button>
                    </div>
                    <div className="grid place-items-center p-1">ENDGAME LAUNCHES</div>
                    <div className="grid grid-cols-3 gap-2 place-items-center bg-blue-950 rounded-lg p-2">
                    <button onClick={() => increaseLaunches('endgame')} className="bg-green-600 border-3 border-green-900 rounded-2xl size-16">+1 </button>
                    <p className="font-bold text-5xl text-center"> {matchData.endgameLaunches}</p>
                    <button onClick={() =>decreaseLaunches('endgame')} className="bg-red-600 rounded-2xl border-3 border-red-900 size-16">-1</button>
                    </div>

                    <div className="grid grid-cols-2 place-items-center p-1">
                        <div>
                            <p>Pass Heard</p>
                            <div className="flex flex-row gap-2 p-2">
                                
                                <button className="text-center text-2xl font-bold  my-1 p-1 bg-green-950 rounded-lg size-12" 
                                onClick={() => setMatchData({...matchData, passHeard: (matchData.passHeard + 1)})}>
                                    {matchData.passHeard}
                                </button>
                                
                                <button className={`text-center text-xl font-bold  my-1 p-1 bg-red-950 rounded-lg size-12`} 
                                onClick={() => setMatchData({...matchData, passHeard: (matchData.passHeard - 1)})}>
                                    -
                                </button>

                            </div>
                        </div>
                        <div>
                            <p>Pass Launched</p>
                            <div className="flex flex-row gap-2 p-2">

                                <button className={`text-center text-xl font-bold  my-1 p-1 bg-red-950 rounded-lg size-12`} 
                                onClick={() => setMatchData({...matchData, passLaunched: (matchData.passLaunched- 1)})}>
                                    -
                                </button>
                                
                                <button className="text-center text-2xl font-bold  my-1 p-1 bg-green-950 rounded-lg size-12" 
                                onClick={() => setMatchData({...matchData, passLaunched: (matchData.passLaunched + 1)})}>
                                    {matchData.passLaunched}
                                </button>
                                
                                

                            </div>
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-2 place-items-center p-1">
                        <div>
                            <p>Robot Died</p>
                            <div className="flex flex-row gap-2 p-2">
                                {matchData.robotDied > 0 && 
                                <button className="text-center font-bold text-sm my-1 p-1 bg-red-950 rounded-lg" 
                                onClick={(() => setMatchData({...matchData, robotDied: 0}))}>
                                    <Image src="/icons/RobotDED.png" alt="" width={53} height={63} />
                                </button>}
                                {matchData.robotDied === 0 && 
                                <button className="text-center font-bold text-sm my-1 p-1 bg-red-950 rounded-lg" 
                                onClick={(() => setMatchData({...matchData, robotDied: 1}))}>
                                    <Image src="/icons/RobotAlive.png" alt="" width={64} height={66} className="rounded-lg" />
                                </button>}
                            </div>
                        </div>
                        <div>
                            <p>Robot Broke</p>
                            <div className="flex flex-row gap-2 p-2">
                                {matchData.robotBroke > 0 && 
                                <button className="text-center font-bold text-sm my-1 p-1 bg-red-950 rounded-lg" 
                                onClick={(() => setMatchData({...matchData, robotBroke: 0}))}>
                                    <Image src="/icons/RobotBroken2.png" alt="" width={101} height={49} />
                                </button>}
                                {matchData.robotBroke === 0 && 
                                <button className="text-center font-bold text-sm my-1 p-1 bg-red-950 rounded-lg" 
                                onClick={(() => setMatchData({...matchData, robotBroke: 1}))}>
                                    <Image src="/icons/RobotSafe2.png" alt="" width={90} height={67} className="rounded-lg" />
                                </button>}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 place-items-center p-1 w-full">
                        <button className="bg-neutral-800 w-full p-2 rounded-lg" onClick={() => handleStoreData()}>Save</button>
                    </div>
                </CardContent>
                
            </Card>
        </div>
    
);
}

export default MatchScoutForm;