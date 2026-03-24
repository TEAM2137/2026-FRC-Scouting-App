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
    // 0-1 = Herd, 2-3 = Pass, 4-5 = Defense

    const [stuff,setStuff] = useState({hn:false,ho:false,pn:false,po:false,dn:false,do:false})
    const [DeadOrAlive,setDeadOrAlive] = useState({dead:false,broke:false})

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
            <h1 className="text-3xl font-extrabold"> Match Number Number</h1>
            <h2>Team #######</h2>
                <div className="grid grid-cols-4 w-full text-white text-5xl text-center mt-10">
                    <p>{Fuel1}</p>
                    <p>{Fuel2}</p>
                    <p>{Fuel3}</p>
                    <p>{Fuel4}</p>
                </div>



                <div className="grid grid-cols-4 w-full mt-3">
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

        <div className="grid grid-cols-2 w-full mt-4 ml-19">
              <p>Neutral Zone</p>
              <p>Opposing Zone</p>
        </div>
        <div className="grid grid-cols-2 w-full mt-4 ml-15">
            <button onClick={() => setStuff({...stuff, hn:!stuff.hn})} className={`${stuff.hn ? "bg-blue-500":"bg-gray-500"} rounded-3xl h-10 border-4 w-30 mt-3`}>
                Herd
            </button>
            <button onClick={() => setStuff({...stuff, ho:!stuff.ho})} className={`${stuff.ho ? "bg-blue-500":"bg-gray-500"} rounded-3xl h-10 border-4 w-30  mt-3`}>
                Herd
            </button>

            <button  onClick={() => setStuff({...stuff, pn:!stuff.pn})} className={`${stuff.pn ? "bg-blue-500":"bg-gray-500"} rounded-3xl h-10 border-4 w-30  mt-3`}>
                Pass
            </button>
            <button onClick={() => setStuff({...stuff, po:!stuff.po})} className={`${stuff.po ? "bg-blue-500":"bg-gray-500"} rounded-3xl h-10 border-4 w-30  mt-3`}>
                Pass
            </button>

            <button  onClick={() => setStuff({...stuff, dn:!stuff.dn})} className={`${stuff.dn ? "bg-blue-500":"bg-gray-500"} rounded-3xl h-10 border-4 w-30  mt-3`}>
                Defense
            </button>
            <button onClick={() => setStuff({...stuff, do:!stuff.do})} className={`${stuff.do ? "bg-blue-500":"bg-gray-500"} rounded-3xl h-10 border-4 w-30  mt-3`}>
                Defense
            </button>
        </div>
        <div className="bg-blue-400 w-screen h-1.5 mt-15 rounded-4xl"></div>
        <div className="grid grid-cols-2 w-screen ml-29 mt-4">
            <button onClick={() => setDeadOrAlive({...DeadOrAlive, dead:!DeadOrAlive.dead})} className="bg-amber-400 w-20 h-20 rounded-2xl">
                Robot DIED
            </button>
            <button onClick={() => setDeadOrAlive({...DeadOrAlive, broke:!DeadOrAlive.broke})} className="bg-amber-400 w-20 h-20 rounded-2xl" >
                Robot BROKE
            </button>
        </div>
        </div>
    );
};

export default yodeloPage;
