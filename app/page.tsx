import SignIn from '@/components/auth/SignIn';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-col h-screen w-screen pl-16 justify-center place-items-center  bg-zinc-50 font-sans dark:bg-neutral-900 ">
        
        <div className="flex flex-col w-full p-2 gap-2 place-items-center">
          <Image src="/images/TEAM2137-Robocat-Head.svg" alt="Acme Logo" width={100} height={50} />
          <div className="text-lg font-bold">NEXT SCOUT</div>
          <div className="text-sm font-normal italic">Welcome to our scouting app for 2026!</div>
        </div>
        <SignIn />

    </div>
  );
}
