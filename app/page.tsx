<<<<<<< HEAD
import { SignalZero } from 'lucide-react';
=======
import SignIn from '@/components/auth/SignIn';
>>>>>>> 0f8ad28408d997d58de52067de15019c022aa30e
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

  return (
<<<<<<< HEAD
  <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>balls</h1>
  
=======
    <div className="grid grid-col h-screen w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="grid grid-col h-screen w-full items-center justify-center place-items-center py-2 px-2 bg-white dark:bg-black sm:items-start">
        <SignIn />
>>>>>>> 0f8ad28408d997d58de52067de15019c022aa30e
      </main>
    </div>
  );
}
