'use client'


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { getToken } from '@/lib/jwt';
import { set } from 'mongoose';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const Page = () => {
    const router = useRouter();
    const { event, setAppEvent } = useAppContext();
    

    
return (
    <div className="flex flex-col w-screen pl-20 text-xs">
        <h1 className="text-xl font-bold">{event?.name}</h1>
        <p>Pit scout robots at the event.</p>
        <Card style={{height:"300px",width:"600px"}}>
            <CardHeader className="text-center" style={{ backgroundColor:"#fecd07"}}>boba tea</CardHeader>
             
            <CardFooter className="text-center" style={{ backgroundColor:"#fecd07"}}>boba tea</CardFooter>
        </Card>
    </div>
)
}

export default Page;