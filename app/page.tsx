import SignIn from '@/components/auth/SignIn';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-col h-screen w-screen pl-16 items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-900">
      
        <SignIn />

    </div>
  );
}
