'use client'


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { getToken } from '@/lib/jwt';
import { set } from 'mongoose';




const Page = () => {
    const router = useRouter();
    const { event, setAppEvent } = useAppContext();


    
return (
    <div id="yodel box"className="flex flex-col w-screen pl-20 h-screen">
        <h1 className="text-xl font-bold"></h1>
        <p>Robot Data for this event.</p>
        <button id="yodler maker" >yodelelele</button>
    </div>
)
}

export default Page;