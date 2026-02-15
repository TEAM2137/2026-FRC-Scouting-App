'use client'

import SignIn from '@/components/auth/SignIn';
import SignUpTeam from '@/components/auth/SignUpTeam';
import Image from 'next/image';
import { useState } from 'react';
import ForgotPassword from '@components/auth/ForgotPassword'
export default function Home() {
  const [authDisplay, setAuthDisplay] = useState('signin');

  return (
    <div className="grid grid-col h-screen w-screen pl-16 justify-center place-items-center  bg-zinc-50 font-sans dark:bg-neutral-900 ">
        
        <div className="flex flex-col w-full p-2 gap-2 place-items-center">
          <Image src="/images/TEAM2137-Robocat-Head.svg" alt="Acme Logo" width={100} height={50} />
          <div className="text-lg font-bold">NEXT SCOUT</div>
          <div className="text-sm font-normal italic">Welcome to our scouting app for 2026!</div>
        </div>

        {authDisplay === 'signin' && 
        <>
        <SignIn />
        <button onClick={() => setAuthDisplay('signupteam')}>
        If your team is not registered, you can sign up for a team here.</button>
        </>
        }
        {authDisplay === 'signupteam' && 
        <>
        <SignUpTeam />
        <button onClick={() => setAuthDisplay('signin')}>
        If you already have a team, you can sign in here.</button>
        </>
        }
        {authDisplay === 'signupteam' && 
        <>
        <ForgotPassword />
        <button onClick={() => setAuthDisplay('ForgotPassword')}>
        If you have forgot your password click here</button>
        </>
        }
    </div>
  );
}