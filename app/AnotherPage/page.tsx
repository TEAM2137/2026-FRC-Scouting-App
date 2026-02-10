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

import React, { cloneElement, useState } from 'react';
import Image from "next/image";



export default function Home() {
  const [yodels, setYodels] = useState(0)
  const [MYPC, setMYPC] = useState(1)
  const [price, setPrice] = useState([10,50,100,1000,10000])
  const yodel = () => {
    setYodels(yodels + 1)
  }
    return (
           <html>
          <body>
           <center><button onClick={yodel}className="font-bold rounded-2xl" style={{ backgroundColor: 'blue', color: 'white', width: "100px"}}>yodel</button></center>
           <center><h1>{yodels}</h1></center>
           <center><button>+1 yodels per click, costs: {price}</button></center>

          </body>
        </html>
    );
}