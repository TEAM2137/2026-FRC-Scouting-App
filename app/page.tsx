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

export default function Home() {

    const [fuel, setFuel] = useState(0)
    const [DeInAmount, setDeInAmount] = useState(1)

    const increaseFuel = () => {
        setFuel(fuel + DeInAmount);
    }
    const decreaseFuel = () => {
        if (fuel > 0 && fuel - DeInAmount > 0) {
            setFuel(fuel - DeInAmount);
        } else {
            setFuel(0)
        }
    }
    const ChangeFuel = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value)%1 == 0) {
            setDeInAmount(Number(event.target.value));
        }
        if (Number(event.target.value) > 50) {
            setDeInAmount(50)
        }
    }

    return (
    <html>
        <body>
            <Card className="bg-blue-800">
                <CardHeader className="bg-yellow-500 rounded-2xl" id ="yodelelo">Team Number: 
                    <select id="yellow">
                        <option value="1">2137</option>
                        <option value="2">2138</option>
                        <option value="3">70073</option>
                    </select>
                </CardHeader>
                <CardContent>
                    <button onClick={increaseFuel} className="bg-green-600 rounded-4xl"id="Increase1">+{DeInAmount} fuel</button>

                    <center><p className="font-bold text-2xl"id = "fuelAmount"> {fuel} </p></center>
                    <button onClick={decreaseFuel} className="bg-red-600 rounded-4xl" id="Decrease1">-{DeInAmount} fuel</button>
                </CardContent>
                <CardDescription>
                    <center><p className="text-white">Fuel Change Amount</p><input className="bg-blue-950 rounded-4xl text-white text-center"onChange={ChangeFuel} value={DeInAmount}></input></center>
                </CardDescription>
            </Card>
            
        </body>
    </html>
    );
}