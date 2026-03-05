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


// My Page is the definition of visual clutter and chaos
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
    // all failed attempts to get the googly moogly varibles to flipping save in mongodb why is this so picky
  //  const getFuelNumber = document.getElementById("fuelAmount")
    // 320px remember this evan
  //  const [accurateData, setAccurateData] = useState([0,0,0,0,""])
    // also remember 70px or it will look weird
  //  const [PromptMessage, setPromptMessage] = useState(["Does this info look correct?", "Yes","No","0px","0px"])
    const [PlusMinusWhich, setPlusMinusWhich] = useState(1)
    const ErrorMessagge = document.getElementById("Error Message")
    // Rip Fuelball2.png, got replaced with auto and teleop ball png
    const [TeleAuto, setTeleAuto] = useState(["Autonomous","/webapp-icons/AutoBall2.png","Teleop",""])
    // 1 = Fuel, 2 = Hang level, 3 = Total Score, 4 = AutoShots, 5 = Robot Died?, 6 = Robot Broken?, 7 = Update the screen
    const [AAGV,SetAAGV] = useState([0,0,0,0,0,0])
    // Stands for Teleop Values To Save
    const [TVTS, setTVTS] = useState([0,0,0])
    // Stands for Trigger To Update Screen, Because you have to have a click function to change the screen and stuff
    const [TTUS, setTTUS] = useState(0)
    const [Roboimgs, setRoboimgs] = useState(["/webapp-icons/RobotAlive.png", "/webapp-icons/Robot3.png"])

    const [MatchData, setMatchData] = useState<IMatchscout>({
        IFuelNumb: 0,
       IsHangerLevel: 0,
      ToeTalScorn: 0,
       MeetTheTeam: 0,
       TeamColor: '',
       OttoShots: 0,
        OttoClimbed: 0,
        FuelOttoScored: 0,
        TheRobotIsDead: 0,
        TheRobotWasNerfed: 0,
     });
    const increaseFuel = () => {
        setFuel((fuel  + DeInAmount));
        setColorChange("white")
        setTTUS(TTUS + 1)
        if (fuel >= 500) {
            setColorChange("red")
            setFuel(500)
        }
        setPlusMinusWhich(1)
    }
    const decreaseFuel = () => {
        setPlusMinusWhich(0)
        setTTUS(TTUS - 1)
        if (fuel > 0 && fuel - DeInAmount > 0) {
            setFuel((fuel - DeInAmount));
        } else {
            setFuel(0)
        }
        setColorChange("white")
       setPlusMinusWhich(-1)
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
        if (MatchData.MeetTheTeam != 0) {
        const response = await storeMatch(MatchData);
        
        if (response.result) {
            //if () {
                 if (Math.random() >= 0.5) {
                    setTeamColore("red")
                } else {
                    setTeamColore("blue")
                }
            console.log("It did stuff")
            //setMatchData({
           //    IFuelNumb: (fuel + (DeInAmount * PlusMinusWhich)),
           //    IsHangerLevel: hangLevel,
           //     ToeTalScorn: ((HPI + fuel) + (DeInAmount * PlusMinusWhich)),
           //     MeetTheTeam: Team,
            //   TeamColor: TeamColore,
           // });
           //   } else {
           // Error[1] = "red"
           // Error[0] = "No team made"
          //  }
            
               // Error[1] = "lime"
               // Error[0] = "Thank you for scouting!!!"
               // Error[1] = "red"
               // Error[0] = "Please reclick the button"
                //Error[1] = "red"
                //Error[0] = "Please reclick the button"
           
        }
     
      
        console.log("Click works")
        console.log(response)
            console.log(MatchData)
        }
    }
const ChangeTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(Number(event.target.value))

}

const ErrorMessage = () => {
    Error[1] = ""
}
useEffect(() => {
    if (TeleAuto[0] == "Teleop") {
        TVTS[0] = fuel
        TVTS[1] = hangLevel
    } else if (TeleAuto[0] == "Autonomous") {
        AAGV[0] = fuel
        AAGV[1] = hangLevel
    }
    if (Team) {
        if (TeleAuto[0] == "Teleop") {
        setMatchData({
            IFuelNumb: (TVTS[0]  + (DeInAmount * PlusMinusWhich)),
            IsHangerLevel: TVTS[1],
            ToeTalScorn: (((TVTS[0] + (TVTS[1] * 10)) + (AAGV[0] + (AAGV[1] * 10))) + ((DeInAmount * PlusMinusWhich))),
            MeetTheTeam: Team,
            TeamColor: TeamColore,
            OttoShots: 0,
            OttoClimbed: AAGV[1],
            FuelOttoScored: (AAGV[0]),
            TheRobotIsDead: 0,
            TheRobotWasNerfed: 0,
        });
        } else if (TeleAuto[0] == "Autonomous") {
             setMatchData({
            IFuelNumb: (TVTS[0]),
            IsHangerLevel: TVTS[1],
            ToeTalScorn: (((TVTS[0] + (TVTS[1] * 10)) + (AAGV[0] + (AAGV[1] * 10))) + ((DeInAmount * PlusMinusWhich))),
            MeetTheTeam: Team,
            TeamColor: TeamColore,
            OttoShots: 0,
            OttoClimbed: AAGV[1],
            FuelOttoScored: (AAGV[0]  + (DeInAmount * PlusMinusWhich)),
            TheRobotIsDead: 0,
            TheRobotWasNerfed: 0,
        });
        }
        
    if (MatchData.IFuelNumb < 0) {
         setMatchData({
            IFuelNumb: 0,
            IsHangerLevel: hangLevel,
            ToeTalScorn: (HPI + 0),
            MeetTheTeam: Team,
            TeamColor: TeamColore,
            OttoShots: 0,
            OttoClimbed: AAGV[1],
            FuelOttoScored: AAGV[0],
            TheRobotIsDead: 0,
            TheRobotWasNerfed: 0,
        });
    } else if (MatchData.IFuelNumb > 500) {
        setMatchData({
            IFuelNumb: 500,
            IsHangerLevel: hangLevel,
            ToeTalScorn: (HPI + 500),
            MeetTheTeam: Team,
            TeamColor: TeamColore,
            OttoShots: 0,
            OttoClimbed: AAGV[1],
            FuelOttoScored: AAGV[0],
            TheRobotIsDead: 0,
            TheRobotWasNerfed: 0,
        });
    }
      Error[1] = "#0f0f31"
    Error[0] = "ur good"
    HandleStoreMatch()
    } else if (!Team) {
        Error[1] = "red"
        Error[0] = "No team made"
    }
    // Rip hang level updating :( it served us well.
    // Rip fuel updating because it caused bugs and stuff
}, [TTUS])

const changeMode = () => {
    if (TeleAuto[0] == "Teleop") {
        TeleAuto[2] = "Teleop"
        TeleAuto[1] = "/webapp-icons/AutoBall2.png"
        TeleAuto[0] = "Autonomous"
        TVTS[0] = fuel
       TVTS[1] = hangLevel
        TVTS[2] = (TVTS[0] + (TVTS[1] * 10))

        setFuel(AAGV[0])
        setHangLevel(AAGV[1])
        setHPI(AAGV[1] * 10)
        if (AAGV[1] == 0) {
            setHangText("Robot Hung?")
        } else {
            setHangText("Robot hang level: " + AAGV[1])
        }
        TeleAuto[3] = "Teleop Stats ------ " + TVTS[0] + " Fuel ---------- Hang Level: " + TVTS[1] + " ---- Total Teleop Score:" + TVTS[2]
    }

    else if(TeleAuto[0] == "Autonomous") {
        TeleAuto[0] = "Teleop"
        TeleAuto[1] = "/webapp-icons/TeleopBall2.png"
        TeleAuto[2] = "Autonomous"
         // 1 = Fuel, 2 = Hang level, 3 = Total Score, 4 = AutoShots, 5 = Robot Died?, 6 = Robot Broken?, 7 = Update the screen
         // AAGV = AutonAndGeneralValues
        AAGV[0] = fuel
        AAGV[1] = hangLevel
        AAGV[2] = (AAGV[0] + (AAGV[1] * 10))
        AAGV[3] = 0
        setFuel(TVTS[0])
        setHangLevel(TVTS[1])
        setHPI(TVTS[1] * 10)
        if (TVTS[1] == 0) {
            setHangText("Robot Hung?")
        } else {
            setHangText("Robot hang level: " + TVTS[1])
        }
        TeleAuto[3] = "Autonomous Stats: " + AAGV[0] + " Fuel ---------- Hang Level: " + AAGV[1] + " ---- Total Auto Score: " + AAGV[2]
    } 
}

// useEffect(() => {
//   AutonAndGeneralValues[6] = 1
//}, [TeleAuto, AutonAndGeneralValues])
const RoboDeadBroke = (ButtonID: Number) => {
        if (Number(ButtonID) === 1) {
            if (Roboimgs[0] == "/webapp-icons/RobotAlive.png") {
            Roboimgs[0] = "/webapp-icons/RobotDED.png"
            } else {
                Roboimgs[0] = "/webapp-icons/RobotAlive.png"
            }
        } else if (Number(ButtonID) === 2 && HangSize === "Enabled") {

        }
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
                    <center><p style={{color: ColorChange}}className="font-bold text-2xl"id = "fuelAmount"> {fuel} </p><Image src={TeleAuto[1]} alt="Logo" width="50" height="50"/></center>
                    <button onClick={decreaseFuel} className="bg-red-600 rounded-2xl border-3 border-red-900 size-18" style={{position:"absolute",top:"116.5px",left:"300px"}} id="Decrease1">-{DeInAmount} fuel</button>
                </CardContent>
                <CardDescription>
                    <center><p style={{color: "white"}}>Change Button Increments</p><input className="bg-blue-950 rounded-4xl border-3 border-blue-875 text-white text-center"onChange={ChangeFuel} value={DeInAmount}></input></center>
                </CardDescription>
                <CardFooter><p className="bg-amber-400 rounded-2xl size-20 text-center border-3 border-amber-600" onClick={() => ChangeLevel(1)}  style={{position:"absolute", top:"350px", left: "154px"}}> {HangText}</p>
                <button style={{position:"absolute", top:"435px", left: "110px"}} onClick={() => ChangeLevel(2)}  className="bg-amber-700 rounded-2xl size-18 text-center font-bold border-3 border-amber-900" >Level 2</button>
                <button style={{position:"absolute", top:"435px", left: "205px"}}onClick={() => ChangeLevel(3)}  className="bg-amber-700 rounded-2xl size-18 text-center font-bold border-3 border-amber-900">Level 3</button>
                </CardFooter>
                <CardFooter><p className="bg-amber-400 rounded-2xl h-8 w-40 text-center border-2 border-amber-600" onChange={() => setMatchData({...MatchData, ToeTalScorn: (HPI + fuel)})} style={{position:"absolute",top:"525px", left:"114px"}}>Total Score: {HPI + fuel}</p> <p className="bg-red-600 rounded-3xl h-12 w-40 text-center border-2 border-red-800" style={{position:"absolute",top:"790px", left:"210px"}} onClick={() => router.push('/MappingTest')}>Go home</p></CardFooter>
                <p 
                onClick={changeMode}
                className="bg-lime-400 border-2 border-lime-600 w-40 h-12 rounded-3xl text-center text-black" 
                style={{position:"absolute", top:"790px", left:"20px"}}> 
                Switch to {TeleAuto[2]}
                </p>
                <h2 id="Error Message" style={{position:"absolute", top:"575px", left:"95px",color:Error[1]}} className="w-50 text-center font-bold">
                    {Error[0]}
                </h2>
                <h3 className="fixed top-30 left-31.5 font-bold text-center text-2xl">{TeleAuto[0]}</h3>
                <h4 className="fixed top-153 w-38 left-5  h-40 border-3 rounded-3xl text-center" style={{backgroundColor:"#0f0f31"}}>{TeleAuto[3]}</h4>
                <img className="fixed top-153 left-50" src={Roboimgs[0]} alt="Logo" width="50" height="50" onClick={() => RoboDeadBroke(1)}/>
            </Card>
        </div>
    
);
}

export default Page;