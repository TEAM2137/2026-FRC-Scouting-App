'use client'

import SignIn from '@/components/auth/SignIn';
import SignUpTeam from '@/components/auth/SignUpTeam';
import Image from 'next/image';
import { useState } from 'react';
import SignUpScout from '@/components/auth/SignUpScout'
export default function Home() {
  const [authDisplay, setAuthDisplay] = useState('signin');

  return (
    <div className="grid grid-col h-screen w-screen pl-16 justify-center place-items-center  bg-zinc-50 font-sans dark:bg-neutral-900 ">
        
        <div className="flex flex-col w-full p-2 gap-2 place-items-center">
          <Image src="/images/TEAM2137-Robocat-Head.svg" alt="Acme Logo" width={100} height={50} />
          <div className="text-sm font-normal italic">Welcome to our scouting app for 2026!</div>
          <Image src="/images/ABACUS-white-4x5.svg" alt="Abacus Logo" width={200} height={250} />
          <div className="text-2xl font-bold">ABACUS</div>
        </div>

        


    </div>
  );
}