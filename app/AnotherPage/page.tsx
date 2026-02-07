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

import React, { useState } from 'react';
import Image from "next/image";



export default function Home() {
    const [score, setScore] = useState(0);
    const getInfo = () => {
        
    }
    return (
        <html>
            <body>
                <p className="bg-purple-400"> 1234 match</p>
            </body>
        </html>
    );
}