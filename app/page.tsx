'use client'

import SignIn from '@/components/auth/SignIn';
import SignUpTeam from '@/components/auth/SignUpTeam';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  
  const clickyBlicky = () => {

  }
  return (
    <div className="grid grid-col h-screen w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="grid grid-col h-screen w-full items-center justify-center place-items-center py-2 px-2 bg-white dark:bg-black sm:items-start">
        <button onClick={}> yodeleleleleleo </button>
        <SignIn/>
      </main>
    </div>
  );
}
