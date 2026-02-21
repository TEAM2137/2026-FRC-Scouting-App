'use client'
import { Input } from '@/components/ui/input';
import { Label } from 'radix-ui';
import SideBar from '@/components/app/SideBar';
import { Checkbox } from '@/components/ui/checkbox';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { getToken } from '@/lib/jwt';
import { set } from 'mongoose';
import {user}
import { IUser } from "@/models/auth/User"


const Page = () => {
   const [formData, setFormData] = useState<IUser>({
averageFuelScore: '',
maxFuelCarry: '',




   })
     }
    const router = useRouter();
    const { event, setAppEvent } = useAppContext();
    

    
return (
    <><div className="flex flex-col w-screen pl-20 text-xs">
        <h1 className="text-xl font-bold">{event?.name}</h1>
        <p>Pit scout robots at the event.</p>
   </div>
   
   
   
   <Card>
    <CardHeader>
<CardTitle>
    <CardDescription>
<div classname="flex flex-col gap-3">
<Label htmlFor="number">How much fuel can this team carry</Label>
<Input
id="number"
type="text"
required
placeholder="12345"
value={FormData.number}
onChange={(e) => {setFormData({...FormData, number: e.target.value})}></Input>
    
    <div className='grid gap-3'>
<Label htmlFor="number">What is their average fuel score</Label>
<Input
id="number"
type="text"
placeholder="12345"
required>
</Input>
    </div>

























    </div>
    </CardDescription>
</CardTitle>
    </CardHeader>
   </Card>
   
   
   
    









</>
)
}

export default Page