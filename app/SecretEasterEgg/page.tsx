'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';


const Page = () => {

    const[fullString, setFullString] = useState("hello! i'm fuel ball!")
    const[option1, setOption1] = useState("whats your name?")
    const[option2, setOption2] = useState("You wanna go somewhere?")
const Options = (Choice: number) => {
    console.log("it runs?")
    if(Number(Choice) === 1 && option2 == "You wanna go somewhere?") {
        console.log("this runs")
        setFullString("usually I wouldn't go to a place with a stranger I just met, but you look friendly so sure")
        setOption1("Pizza place")
        setOption2("The Cafe")
    } else if (Number(Choice) === 1 && option2 == "The Cafe") {
        setFullString("uh not to be rude but its 2:34 in the afternoon thats not the greatest time to get coffee")
        setOption1("We could get a baked good")
        setOption2("What a baby, caffine isn't gonna kill you")
    } else if (Number(Choice) === 1 && option2 == "What a baby, caffine isn't gonna kill you") {
        setFullString("actually I have a severe illness I was born with that if I drink coffee after 10am I could die")
        setOption2("oh, i'm sorry about that")
        setOption1("you COULD die.")
    }
    if(Number(Choice) === 2 && option1 == "whats your name?") {
        setFullString("??? i just told you my name, its fuel ball")
        setOption1("Sorry I wasn't listening before")
        setOption2("Just wanted you to say your name again")
    } else if (Number(Choice) === 2 && option1 == "Sorry I wasn't listening before") {
        setFullString("uh... ok... kinda rude but whatever, oh that reminds me! whats your name?")
        setOption1("i'm pyshically incapable of giving my name fuel ball")
        setOption2("Oh its [Name]")
    } else if (Number(Choice) === 2 && option1 == "i'm pyshically incapable of giving my name fuel ball") {
        setFullString("wha- what? What do you mean by that")
        setOption1("Fuel ball the coder that made you didn't add an input statement, meaning I can't type my name")
        setOption2("Oh its just that I forgot my name silly")
    } else if (Number(Choice) === 2 && option1 == "Fuel ball the coder that made you didn't add an input statement, meaning I can't type my name") {
        setFullString("w-w-whats a coder? Whats an input? And type your n-n-name WHAT DO YOU MEAN????")
        setOption1("Fuel Ball your an image texture in a digital game with written dialouge, everything you say has been scripted and written by the coder.")
        setOption2("I'm joking! its [Name]")
    }
}

return (
    <div>
    <img src="/webapp-icons/BackgroundForFBDS.png" className='w-full h-200'></img>
    <h1 className='font-bold text-white text-2xl' style={{position:"absolute",top:"0%",left:"45%"}}>Fuel Ball NOT Dating Sim</h1>
    <img src="/webapp-icons/FuelMan.png" id="feulball" className="w-50 h-130"style={{position:"absolute",top:"25%",left:"45%"}}></img>
    <button onClick={() => Options(2)} className="bg-amber-400 border-3 border-amber-600 rounded-3xl w-50 text-center h-15"style={{position:"absolute",top:"400px",left:"300px"}}>{option1}</button>
    <button  onClick={() => Options(1)} className="bg-amber-400 border-3 border-amber-600 rounded-3xl w-50 text-center h-15"style={{position:"absolute",top:"400px",left:"550px"}}>{option2}</button>
    <h2 className="bg-blue-500 border-4 border-blue-700 w-75 h-30 text-center" style={{position:"absolute",top:"465px",left:"375px"}}> {fullString}</h2>
    </div>
)
}

export default Page;