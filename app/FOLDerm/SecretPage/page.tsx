'use client'

import { useState, useEffect, use } from 'react';
import Image from 'next/image';

const secretPage = () => {
    const [clicks,setClicks] = useState(0)
    const [RAndom, setRAndom] = useState([50,50])
    const [Prices, setPrices] = useState([10,50,100,300])
    const [Nullscapes, setNullscapes] = useState([0,0])
    const [SS, setSS] = useState([22,44])
    const [SI,setSI] = useState("/SPA/FuelMann.svg")
    const [MaxClick,setMaxClick] = useState(1)
    const [Name,setName] = useState(["give stickman a hat: ","Buy stickman a house: ","Add Gadgets: ","add Nullscapes gameplay"])
    const [House, setHouse] = useState([0,0])

    const ClickNChange = () => {
        setRAndom([(Math.random() * 800),(Math.random() * 300)])
        setClicks(clicks + MaxClick)
    }
    const Purchase = (Item: number) => {
        if (Item == 0) {
            if (clicks >= Prices[0]) {
                setClicks(clicks - Prices[0])
                setSI("/SPA/FuelGentleMan.svg")
                setSS([33,54])
                Prices[0] = Math.round(Prices[0] * 1.5)
                setMaxClick(MaxClick + 1)
                Name[0] = "Upgrade stickman: "
            }
            }
            if (Item == 1) {
                if (clicks >= Prices[1]) {
                    setClicks(clicks - Prices[1])
                    Prices[1] = Math.round(Prices[1] * 1.2)
                    Name[1] = "Upgrade house size by 1.25:1 pixels : "
                    House[0] += 1.25
                    House[1] += 1
                }
            }
            if (Item == 2) {

            if (clicks >= Prices[2]) {
                setClicks(clicks - Prices[2])
            }
            }
            if (Item == 3) {

            if (clicks >= Prices[3]) {
                setClicks(clicks - Prices[3])
                setNullscapes([200,150])
            }
             }
    }
    return(
    <div className="fixed w-full h-full z-11 text-center bg-white text-black">
        <h1 className="font-bold"> Find little stickman and gain points</h1>
        <h2 className="text-2xl font-bold">{clicks}</h2>
     <Image onClick={ClickNChange} src={SI} alt="nothing" width={SS[0]} height={SS[1]} style={{position:"absolute", top:RAndom[0], left:RAndom[1],}} className="rounded-lg z-12" />
        <div className="grid grid-cols-2 w-full  mt-20 text-black ml-5 ">
            <button onClick={() => Purchase(0)} className=" bg-green-600 border-3 w-40 rounded-2xl"> {Name[0]} {Prices[0]}</button>
            <button onClick={() => Purchase(1)} className=" bg-green-600 border-3 w-40 rounded-2xl"> {Name[1]}  {Prices[1]}</button>
            <button onClick={() => Purchase(2)} className=" bg-green-600 border-3 w-40 rounded-2xl mt-10"> {Name[2]}  {Prices[2]}</button>
            <button onClick={() => Purchase(3)} className=" bg-green-600 border-3 w-40 rounded-2xl mt-10"> {Name[3]}  {Prices[3]}</button>
        </div>
        <Image src="/SPA/Nullscapes.gif" alt="yes" width={Nullscapes[0]} height={Nullscapes[1]} className="fixed top-100 left-30 z-8" />
        <Image src="/SPA/House.svg" alt="House" width={House[0]} height={House[1]} className="fixed top-20 left-20 z-10"></Image>
    </div>
    );
};

export default secretPage;