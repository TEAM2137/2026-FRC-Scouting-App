'use client'


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { getToken } from '@/lib/jwt';
import { set } from 'mongoose';
import { IMatchscout } from '@/models/frc-events/matchScout/matchScout';




const Page = () => {
    const router = useRouter();
    const { event, setAppEvent } = useAppContext();
    const [formData, SetFormData] = useState<IMatchscout>({
      totalShotsAuto: 0,
      totalPassedAuto: 0,
      totalHerded: 0,
      totalPassedTeleop: 0,
      totalShotsTeleop: 0,
      climbLevelTeleop: 0,
      didDie: 0,
      didBreak: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalScored: 0,
      didAutoClimb: 0,


    });


return (
    <div className="flex flex-col w-screen pl-20 text-xs">
        <h1 className="text-xl font-bold">{event?.name}</h1>
        <p>Match Schedule to scout for the event.</p>
    </div>
)
}

export default Page;