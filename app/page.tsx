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

    const [fuel, setFuel] = useState(0)
    const [DeInAmount, setDeInAmount] = useState(1)
    const [hangLevel, setHangLevel] = useState(0)
    const [HPI, setHPI] = useState(0)
    const [RP, setRP] = useState(0)
    const increaseFuel = () => {
        setFuel((fuel  + DeInAmount));
        if (fuel >= 49 && fuel < 99) {
            setRP(1)
        } else if (fuel >= 99 && fuel < 359) {
            setRP(2)
        } else if (fuel >= 359) {
            setRP(3)
        } else {
            setRP(0)
        }
        if (fuel >= 800) {
            setFuel(800)
            alert("nuh uh")
            if (Math.random() <= 0.5) {
                open("https://www.youtube.com/watch?v=yzUHolqu-NA")
            } else if (Math.random() <= 0.5) {
                open("https://youtu.be/N2mGh-PHJXs?t=9")
            } else {
                open("https://youtu.be/e1wcXEedXO4")
            }
            
            
        }
    }
    const decreaseFuel = () => {
        if (fuel > 0 && fuel - DeInAmount > 0) {
            setFuel((fuel - DeInAmount));
        } else {
            setFuel(0)
        }
        if (fuel >= 49 && fuel < 99) {
            setRP(1)
        } else if (fuel >= 99 && fuel < 359) {
            setRP(2)
        } else if (fuel >= 359) {
            setRP(3)
        } else {
            setRP(0)
        }
    }
    const ChangeFuel = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value)%1 == 0) {
            setDeInAmount(Number(event.target.value));
        }
        if (Number(event.target.value) > 60) {
            setDeInAmount(60)
        }
    }
    const ChangeLevel = (level: Number) => {
        setHangLevel(Number(level))
        if (Number(level) === 0) {
            setHPI(0)
        } else if (Number(level) === 1) {
            setHPI(10)
        } else if (Number(level) === 2) {
            setHPI(20)
        } else if (Number(level) === 3) {
            setHPI(30)
        }
        
    }

    return (
    <html>
        <body>
            <Card className="bg-blue-800 rounded-4xl">
                <CardHeader className="bg-yellow-500 rounded-2xl" id ="yodelelo">Team Number: 
                    <select id="yellow">
                        <option value="1">2137</option>
                        <option value="2">2138</option>
                        <option value="3">70073</option>
                    </select>
                </CardHeader>
                <CardContent>
                    <button onClick={increaseFuel} className="bg-green-600 rounded-2xl size-15"id="Increase1">+{DeInAmount} fuel</button>
                    <center><p className="font-bold text-2xl"id = "fuelAmount"> {fuel} </p><Image src="/webapp-icons/FuelBall2.png" alt="Logo" width="50" height="50"/></center>
                    <button onClick={decreaseFuel} className="bg-red-600 rounded-2xl size-15" id="Decrease1">-{DeInAmount} fuel</button>
                </CardContent>
                <CardDescription>
                    <center><p className="text-white">Fuel Change Amount</p><input className="bg-blue-950 rounded-4xl text-white text-center"onChange={ChangeFuel} value={DeInAmount}></input></center>
                </CardDescription>
                <CardFooter><p className="bg-amber-400 rounded-2xl size-15 text-center">Hang Level: {hangLevel}</p><button onClick={() => ChangeLevel(0)} className="bg-amber-500 rounded-2xl size-15 text-center font-bold">Didn't Hang</button>
                <button onClick={() => ChangeLevel(1)} className="bg-amber-600 rounded-2xl size-15 text-center font-bold">Level 1</button>
                <button onClick={() => ChangeLevel(2)} className="bg-amber-700 rounded-2xl size-15 text-center font-bold">Level 2</button>
                <button onClick={() => ChangeLevel(3)} className="bg-amber-800 rounded-2xl size-15 text-center font-bold">Level 3</button>
                </CardFooter>
                <CardFooter><p className="bg-amber-400 rounded-2xl size-3/30 text-center border-2 border-amber-600">Total Score: {HPI + fuel}</p> <p className="bg-indigo-600 rounded-2xl size-3/30 text-center border-2 border-indigo-800">RP gained: {RP}</p></CardFooter>
            </Card>
        </body>
    </html>
    );
}