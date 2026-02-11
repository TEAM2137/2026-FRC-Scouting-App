'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React, { cloneElement, useState } from 'react';
import Image from "next/image";



export default function Home() {
  const [sizey,setSizey] = useState(200)
  const [oneyFound, setOneyFound] = useState(0);
  const moveShaw = () => {
    const shaw = document.getElementById("shaw");
    shaw.style.top = Math.random() * window.innerHeight + "px";
    shaw.style.left = Math.random() * window.innerWidth + "px";
    setSizey(Math.random() * 40 + 10);
    setOneyFound(oneyFound + 1);
  }
    return (
           <html>
          <body>
            <center> <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                    <h1>find the oney plays dance</h1>
                    <h1>you've found it: {oneyFound}</h1>
                    <Image src="/webapp-icons/android-chrome-512x512.png" alt="Logo" width="200" height="200" />
                    <Image id="shaw" onClick={moveShaw} src="/webapp-icons/Shaw.gif" alt="Shaw" width={sizey} height={sizey} style={{position: "absolute", top: "0px", left: "0px"}} />
                    </main> </center>
          </body>
        </html>
    );
}