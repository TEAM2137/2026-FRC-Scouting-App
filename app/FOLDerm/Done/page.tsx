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
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';

const yodeloPage = () => {
    const [EHL,setEHL] = useState(["#393f78","#393f78","#393f78","#393f78"])
    const [yodel, setYodel] = useState(0)
    const selectType = (Start:Number) => {
        if (Start == 0) {
            setEHL(["#727ff1","#393f78","#393f78","#393f78"])
        } else if (Start == 1) {
            setEHL(["#393f78","#727ff1","#393f78","#393f78"])
        } else if (Start == 2) {
            setEHL(["#393f78","#393f78","#727ff1","#393f78"])
        } else if (Start == 3) {
            setEHL(["#393f78","#393f78","#393f78","#727ff1"])
        }
    }
    const RemoveFuel = (Amount: Number) => {
        setYodel(yodel - Amount)
        if (yodel - Amount < 0) {
            setYodel(0)
        }
    }
    return (
        <div className="fixed w-full h-full z-11">
            <Card className="fixed w-full h-full"> 
                <button onClick={() => selectType(0)} className="text-white p-2 rounded-lg w-20 h-15 fixed left-4 top-30 border-3" style={{backgroundColor: EHL[0]}}>
                    Auto
                </button>
                <button onClick={() => selectType(1)} className="text-white p-2 rounded-lg w-20 h-15 fixed left-27 top-30 border-3" style={{backgroundColor: EHL[1]}}>
                    First Shift
                </button>
                 <button onClick={() => selectType(2)} className="text-white p-2 rounded-lg w-20 h-15 fixed left-50 top-30 border-3" style={{backgroundColor: EHL[2]}}>
                    Second Shift
                </button>
                 <button onClick={() => selectType(3)} className="text-white p-2 rounded-lg w-20 h-15 fixed left-73 top-30 border-3" style={{backgroundColor: EHL[3]}}>
                    End Game
                </button>
                <button  onClick={() => RemoveFuel(-10)} className="text-white bg-green-500 border-3 border-green-700 rounded-3xl w-20 h-20 font-bold text-3xl fixed top-50 left-4">
                    +10
                </button>
                 <button onClick={() => RemoveFuel(-5)}className="text-white bg-green-500 border-3 border-green-700 rounded-3xl w-20 h-20 font-bold text-3xl fixed top-50 left-27">
                    +5
                </button>
                 <button onClick={() => RemoveFuel(-1)}className="text-white bg-green-500 border-3 border-green-700 rounded-3xl w-20 h-20 font-bold text-3xl fixed top-50 left-51">
                    +1
                </button>
                 <button onClick={() => RemoveFuel(5)} className="text-white bg-red-500 border-3 border-red-700 rounded-3xl w-20 h-20 font-bold text-3xl fixed top-50 left-74">
                    -5
                </button>
                <center><p className="text-white text-5xl">{yodel}</p></center>
            </Card>

        </div>
    );
};

export default yodeloPage;
