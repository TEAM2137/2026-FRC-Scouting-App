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
        <Card>
          <CardHeader>
            I feel it deep within
          </CardHeader>
          <CardAction>
              its just underneath the skin
            </CardAction>
            <CardContent>
              I must confess that i feel like a monster
              </CardContent>
              <CardContent>
                <input type="text" placeholder="do you feel like a monster"></input>
                <button>yes</button>
              </CardContent>
        </Card>
        <script>
        </script>
        <Image src="/webapp-icons/android-chrome-512x512.png" alt="Logo" width="200" height="200" />
      </main>
    </div>
  );
}
