import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid min-h-screen items-center justify-center  font-sans">
      <div className="flex min-h-screen w-full flex-col items-center text-white justify-center py-32 px-16  sm:items-start">
        <h1>Welcome to 2026-scouting-app</h1>
        <Image src="/webapp-icons/android-chrome-512x512.png" alt="Logo" width="200" height="200" />
        <h2 className="text-2xl font-bold">new scouting app</h2>
      </div>
    </div>
  );
}
