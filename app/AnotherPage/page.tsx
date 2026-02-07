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
    const [cardIm,setcardIm] = useState("/webapp-icons/FRC-Card-Back2.png")
    const flipCard = () => {
        setcardIm(cardIm === "/webapp-icons/FRC-Card-Back2.png" ? "/webapp-icons/FRC-Card-Outline3.png" : "/webapp-icons/FRC-Card-Back2.png")
    }
    return (
        <html>
            <body>
                <Card>
                    <CardHeader><center>Easter Eggs</center></CardHeader>
                    <CardContent><center><button>spawn fuel</button></center></CardContent>
                    
                </Card>
                <img onClick={flipCard} src="/webapp-icons/FRC-Card-Back2.png"></img>
            </body>
        </html>
    );
}