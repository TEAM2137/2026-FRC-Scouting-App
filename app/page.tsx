import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans ">
      <div className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16   sm:items-start">
        <h1>Welcome to 2026-scouting-app</h1>
        <Image src="/webapp-icons/android-chrome-512x512.png" alt="Logo" width="200" height="200" />
      </div>
    </div>
  );
}
