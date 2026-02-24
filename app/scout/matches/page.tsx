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

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { getToken } from '@/lib/jwt';
import { set } from 'mongoose';
import Image from 'next/image';
// import { IUser } from "@/models/auth/User"
// I don't think i need store user yet, So i won't use it unless I need to 
// import storeUser from "@/lib/auth/storeUser"
import { IMatchscout } from "@/models/frc-events/matchScout/matchScout";
import storeMatch from "@/lib/auth/storeMatch"


const Page = () => {
    const router = useRouter();
    const { event, setAppEvent } = useAppContext();
    

    const [fuel, setFuel] = useState(0)
    const [DeInAmount, setDeInAmount] = useState(1)
    const [hangLevel, setHangLevel] = useState(0)
    const [HPI, setHPI] = useState(0)
    const [RP, setRP] = useState(0)
    const [ColorChange, setColorChange] = useState("white")
    const [HangText,setHangText] = useState("Robot Hung?")
    const [HangSize, setHangSize] = useState("Disabled")
    const [TeamColore, setTeamColore] = useState("blue")
    const [TotalScore, setTotalScore] = useState(0)
    const [MatchData, setMatchData] = useState<IMatchscout>({
        IFuelNumb: 0,
       IsHangerLevel: 0,
      ToeTalScorn: 0,
       MeetTheTeam: 0,
       TeamColor: '',
     });
    const increaseFuel = () => {
        setFuel((fuel  + DeInAmount));
        setColorChange("white")
        if (fuel >= 49 && fuel < 99) {
            setRP(1)
        } else if (fuel >= 99 && fuel < 359) {
            setRP(2)
        } else if (fuel >= 359) {
            setRP(3)
        } else {
            setRP(0)
        }
        if (fuel >= 500) {
            setColorChange("red")
            setFuel(500)
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
        setColorChange("white")
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
        if (Number(level) === 1) {
            setHangSize("Enabled")
            setHPI(10)
            setHangLevel(Number(level))
            setHangText("Robot hang level: " + Number(level))
        } else if (Number(level) === 2 && HangSize === "Enabled") {
            setHPI(20)
            setHangLevel(Number(level))
            setHangText("Robot hang level: " + Number(level))
        } else if (Number(level) === 3 && HangSize === "Enabled") {
            setHPI(30)
            setHangLevel(Number(level))
            setHangText("Robot hang level: " + Number(level))
        } 
    }
       const HandleStoreMatch = async () => {
            setMatchData({
                IFuelNumb: fuel,
                IsHangerLevel: hangLevel,
                ToeTalScorn: TotalScore,
                MeetTheTeam: Math.round(Math.random() * 10000),
                TeamColor: TeamColore
            })
           if (Math.random() >= 0.5) {
                setTeamColore("red")
        } else {
            setTeamColore("blue")
        }
        console.log("Click works")
        const response = await storeMatch(MatchData);
        console.log(response)
        if (response.result) {
            console.log("It did stuff")
            console.log(MatchData)
            setMatchData({
                IFuelNumb: fuel,
                IsHangerLevel: hangLevel,
                ToeTalScorn: TotalScore,
                MeetTheTeam: Math.round(Math.random() * 10000),
                TeamColor: TeamColore
            })


        }
     }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-11">
            <Card className=" rounded-4xl w-full h-full" style={{backgroundColor:"#0f0f31"}}>
                <CardHeader  className="border-3 border-amber-600"style={{backgroundColor:"#fecd07"}} id ="yodelelo">Team Number: 
                    <select id="yellow">
                        <option value="1">Nothing</option>
                        <option value="2">Nothing</option>
                    </select>
                </CardHeader>
                <CardContent>
                    <button onClick={increaseFuel} className="bg-green-600 border-3 border-green-900 rounded-2xl size-18"id="Increase1">+{DeInAmount} fuel</button>
                    <center><p style={{color: ColorChange}}className="font-bold text-2xl"id = "fuelAmount"> {fuel} </p><Image src="/webapp-icons/FuelBall2.png" alt="Logo" width="50" height="50"/></center>
                    <button onClick={decreaseFuel} className="bg-red-600 rounded-2xl border-3 border-red-900 size-18" style={{position:"absolute",top:"107px",left:"300px"}} id="Decrease1">-{DeInAmount} fuel</button>
                </CardContent>
                <CardDescription>
                    <center><p style={{color: "white"}}>Change Button Increments</p><input className="bg-blue-950 rounded-4xl border-3 border-blue-875 text-white text-center"onChange={ChangeFuel} value={DeInAmount}></input></center>
                </CardDescription>
                <CardFooter><p className="bg-amber-400 rounded-2xl size-20 text-center border-3 border-amber-600" onClick={() => ChangeLevel(1)}  style={{position:"absolute", top:"350px", left: "154px"}}> {HangText}</p>
                <button style={{position:"absolute", top:"435px", left: "110px"}} onClick={() => ChangeLevel(2)}  className="bg-amber-700 rounded-2xl size-18 text-center font-bold border-3 border-amber-900" >Level 2</button>
                <button style={{position:"absolute", top:"435px", left: "205px"}}onClick={() => ChangeLevel(3)}  className="bg-amber-700 rounded-2xl size-18 text-center font-bold border-3 border-amber-900">Level 3</button>
                </CardFooter>
                <CardFooter><p className="bg-amber-400 rounded-2xl h-8 w-40 text-center border-2 border-amber-600" onChange={() => setMatchData({...MatchData, ToeTalScorn: (HPI + fuel)})} style={{position:"absolute",top:"800px", left:"5px"}}>Total Score: {HPI + fuel}</p> <p className="bg-indigo-600 rounded-2xl h-8 w-40 text-center border-2 border-indigo-800" style={{position:"absolute",top:"800px", left:"225px"}}>RP gained: {RP}</p></CardFooter>
                <p 
                onClick={() => {HandleStoreMatch()}}
                className="bg-lime-400 border-2 border-lime-600 w-30 h-12 rounded-3xl text-center text-black" 
                style={{position:"absolute", top:"740px", left:"140px"}}> 
                Save Data (double click)
                </p>
            </Card>
        </div>
    
);
}

export default Page;