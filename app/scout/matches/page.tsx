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
import { Fuel } from "lucide-react";


const Page = () => {
    const router = useRouter();
    const { event, setAppEvent } = useAppContext();
    

    const [fuel, setFuel] = useState(0)
    const [DeInAmount, setDeInAmount] = useState(1)
    const [hangLevel, setHangLevel] = useState(0)
    const [HPI, setHPI] = useState(0)
    const [ColorChange, setColorChange] = useState("white")
    const [HangText,setHangText] = useState("Robot Hung?")
    const [HangSize, setHangSize] = useState("Disabled")
    const [TeamColore, setTeamColore] = useState("blue")
    const [Team, setTeam] = useState(0)
    const [Error, setError] = useState(["Nothing wrong here","#0f0f31"])
    const ErrorMessagge = document.getElementById("Error Message")

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
        const response = await storeMatch(MatchData);
        if (response.result) {
            //if () {
                 if (Math.random() >= 0.5) {
                    setTeamColore("red")
                } else {
                    setTeamColore("blue")
                }
            console.log("It did stuff")
            setMatchData({
               IFuelNumb: fuel,
               IsHangerLevel: hangLevel,
                ToeTalScorn: (HPI + fuel),
                MeetTheTeam: Team,
               TeamColor: TeamColore,
                });
           //   } else {
           // Error[1] = "red"
           // Error[0] = "No team made"
          //  }
            const Pmpt = prompt("Does this data look correct? " + MatchData.IFuelNumb + " Fuel " + "(Y/N)")
            if (Pmpt.toLowerCase() == "y") {
                Error[1] = "lime"
                Error[0] = "Thank you for scouting!!!"
            } else if (Pmpt.toLowerCase() == "n") {
                Error[1] = "red"
                Error[0] = "Please reclick the button"
            } else {
                 Error[1] = "red"
                Error[0] = "Please reclick the button"
            }
        }
     
      
        console.log("Click works")
        console.log(response)
            console.log(MatchData)
    }
const ChangeTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(Number(event.target.value))

}

const ErrorMessage = () => {
    Error[1] = ""
}
        
       

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-11">
            <Card className=" rounded-4xl w-full h-full" style={{backgroundColor:"#0f0f31"}}>
                <CardHeader  className="border-3 border-amber-600"style={{backgroundColor:"#fecd07"}} id ="yodelelo">Team Number: 
                    <input type="number" id="yellow" className="bg-orange-400 border-3 rounded-3xl text-center border-orange-700" onChange={ChangeTeam}>
                    </input>
                </CardHeader>
                <CardContent>
                    <button onClick={increaseFuel} className="bg-green-600 border-3 border-green-900 rounded-2xl size-18"id="Increase1">+{DeInAmount} fuel</button>
                    <center><p style={{color: ColorChange}}className="font-bold text-2xl"id = "fuelAmount"> {fuel} </p><Image src="/webapp-icons/FuelBall2.png" alt="Logo" width="50" height="50"/></center>
                    <button onClick={decreaseFuel} className="bg-red-600 rounded-2xl border-3 border-red-900 size-18" style={{position:"absolute",top:"116.5px",left:"300px"}} id="Decrease1">-{DeInAmount} fuel</button>
                </CardContent>
                <CardDescription>
                    <center><p style={{color: "white"}}>Change Button Increments</p><input className="bg-blue-950 rounded-4xl border-3 border-blue-875 text-white text-center"onChange={ChangeFuel} value={DeInAmount}></input></center>
                </CardDescription>
                <CardFooter><p className="bg-amber-400 rounded-2xl size-20 text-center border-3 border-amber-600" onClick={() => ChangeLevel(1)}  style={{position:"absolute", top:"350px", left: "154px"}}> {HangText}</p>
                <button style={{position:"absolute", top:"435px", left: "110px"}} onClick={() => ChangeLevel(2)}  className="bg-amber-700 rounded-2xl size-18 text-center font-bold border-3 border-amber-900" >Level 2</button>
                <button style={{position:"absolute", top:"435px", left: "205px"}}onClick={() => ChangeLevel(3)}  className="bg-amber-700 rounded-2xl size-18 text-center font-bold border-3 border-amber-900">Level 3</button>
                </CardFooter>
                <CardFooter><p className="bg-amber-400 rounded-2xl h-8 w-40 text-center border-2 border-amber-600" onChange={() => setMatchData({...MatchData, ToeTalScorn: (HPI + fuel)})} style={{position:"absolute",top:"525px", left:"114px"}}>Total Score: {HPI + fuel}</p> <p className="bg-red-600 rounded-3xl h-12 w-40 text-center border-2 border-red-800" style={{position:"absolute",top:"790px", left:"210px"}} onClick={() => router.push('/selectevent')}>Go home</p></CardFooter>
                <p 
                onClick={() => {HandleStoreMatch()}}
                className="bg-lime-400 border-2 border-lime-600 w-40 h-12 rounded-3xl text-center text-black" 
                style={{position:"absolute", top:"790px", left:"20px"}}> 
                Save Data (double click)
                </p>
                <h2 id="Error Message" style={{position:"absolute", top:"575px", left:"95px",color:Error[1]}} className="w-50 text-center font-bold">
                    {Error[0]}
                </h2>
            </Card>
        </div>
    
);
}

export default Page;