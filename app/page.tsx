import SignIn from '@/components/auth/SignIn';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-col h-screen w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="grid grid-col h-screen w-full items-center justify-center place-items-center py-2 px-2 bg-white dark:bg-black sm:items-start">
        <SignIn />
      </main>
    </div>
  );
}
