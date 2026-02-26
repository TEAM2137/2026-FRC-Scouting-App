
'use server'
//import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { getToken } from '@/lib/jwt';
import { set } from 'mongoose';
import connectDB from "@/lib/db";
import Matchscout from "@/models/frc-events/matchScout/matchScout";


export default async function Pagee() {
//  const router = useRouter();
//    const { event, setAppEvent } = useAppContext();
    
    await connectDB()

    const matchData = await Matchscout.find({}).lean()

    
return (
    <div id="yodel box"className="flex flex-col w-screen pl-20 h-screen">
        <h1 className="text-xl font-bold"></h1>
        <p>Robot Data for this event.</p>
        <button id="yodler maker" >yodelelele</button>
            {matchData.map((match) => (
            <h1 key={match._id.toString()}>
                    <p className=" border-3 rounded-3xl text-white w-30 h-30 text-center" style={{backgroundColor:match.TeamColor}}>
                    Match Test Team: {match.MeetTheTeam} - Scored: {match.IFuelNumb} HangLevel - {match.IsHangerLevel}
                    </p>
    
                
            </h1>
            ))}
    </div>
    )
}
