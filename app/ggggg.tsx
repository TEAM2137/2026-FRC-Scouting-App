import Image from 'next/image';
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Welcome to 2026-scouting-app</h1>
        <select id="yellow">
          team number
          <option value="option1">2137</option>
          <option value="option2">1234</option>
          <option value="option3">6699</option>
        </select>
        <button id="scouty">Scout</button>
        <script src="mrbeast"> </script>
        <Image src="/webapp-icons/android-chrome-512x512.png" alt="Logo" width="200" height="200" />
      </main>
    </div>
  );
}
