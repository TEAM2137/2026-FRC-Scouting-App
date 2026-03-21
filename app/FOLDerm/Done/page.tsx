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
    const [Fuel1, setFuel1] = useState(0)
    const [Fuel2, setFuel2] = useState(0)
    const [Fuel3, setFuel3] = useState(0)
    const [Fuel4, setFuel4] = useState(0)
    const [Shift, setShift] = useState("Auto")

    const RemoveFuel = (Amount: number) => {
        if (Shift === "Auto") {
             setFuel1(Fuel1 - Amount)
        } else if (Shift === "First") {
            setFuel2(Fuel2 - Amount)
        } else if (Shift === "Second") {
            setFuel3(Fuel3 - Amount)
        } else if (Shift === "EndGame") {
            setFuel4(Fuel4 - Amount)
        }
    }
    useEffect(() => {
         if (Fuel4 < 0) {
                setFuel4(0)
            }
              if (Fuel3 < 0) {
                setFuel3(0)
            }
              if (Fuel2 < 0) {
                setFuel2(0)
            }
                       if (Fuel1 < 0) {
                setFuel1(0)
            }
    }, [Fuel1,Fuel2,Fuel3,Fuel4])
    return (
        <div className="fixed w-full h-full z-11 p-4 justify-center place-items-center bg-blue-950">
                <div className="grid grid-cols-4 w-full text-white text-5xl text-center">
                    <p>{Fuel1}</p>
                    <p>{Fuel2}</p>
                    <p>{Fuel3}</p>
                    <p>{Fuel4}</p>
                </div>



                <div className="grid grid-cols-4 w-full">
                <button onClick={() => setShift("Auto")} className={`text-white p-2 rounded-lg w-20 h-15  border-3 ${Shift==="Auto" ? "bg-blue-400":"bg-gray-400"}`}>
                    Auto
                </button>
                <button onClick={() => setShift("First")} className={`text-white p-2 rounded-lg w-20 h-15  border-3 ${Shift==="First" ? "bg-blue-400":"bg-gray-400"}`}>
                    First Shift
                </button>
                 <button onClick={() => setShift("Second")} className={`text-white p-2 rounded-lg w-20 h-15  border-3 ${Shift==="Second" ? "bg-blue-400":"bg-gray-400"}`}>
                    Second Shift
                </button>
                 <button onClick={() => setShift("EndGame")} className={`text-white p-2 rounded-lg w-20 h-15 border-3 ${Shift==="EndGame" ? "bg-blue-400":"bg-gray-400"}`}>
                    End Game
                </button>
            </div>
            

            <div className="grid grid-cols-4 w-full  mt-2">
                <button  onClick={() => RemoveFuel(-10)} className="text-white bg-green-500 border-3 border-green-700 rounded-3xl w-20 h-20 font-bold text-3xl ">
                    +10
                </button>
                 <button onClick={() => RemoveFuel(-5)}className="text-white bg-green-500 border-3 border-green-700 rounded-3xl w-20 h-20 font-bold text-3xl ">
                    +5
                </button>
                 <button onClick={() => RemoveFuel(-1)}className="text-white bg-green-500 border-3 border-green-700 rounded-3xl w-20 h-20 font-bold text-3xl ">
                    +1
                </button>
                 <button onClick={() => RemoveFuel(5)} className="text-white bg-red-500 border-3 border-red-700 rounded-3xl w-20 h-20 font-bold text-3xl ">
                    -5
                </button>
        </div>

        <div className="grid grid-cols-4">
              <button>Defensive Herd</button>
        </div>
        </div>
    );
};

export default yodeloPage;
