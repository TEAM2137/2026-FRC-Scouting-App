'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SideBar from '@/components/app/SideBar';
import { Checkbox } from '@/components/ui/checkbox';
import { CardContent, CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { IPitscout } from "@/models/PitScout/pitscout"


const Page = () => {
   const [formData, setFormData] = useState<IPitscout>({
 maxFuelCarry: 0,
  PassPosition: 0,
  scoringPosition: 0,
  autonPath: '',
  canGoThroughTrench: false,
  intakeType: '',
  autonClimb: false,
  closedHopper: false,
  multishot: 0,
  teleopClimb: 0,
  launchSpeed: 0,
  weight: 0,
  //meta data for the file. 
  createdAt: new Date(),
  updatedAt: new Date(),
   })
     
    const router = useRouter();
    const { appEvent, setAppEvent } = useAppContext();
    

    
return (
    <>
   
   
   
   <Card>
    <CardHeader>
<CardTitle> scouting page</CardTitle>
    <CardDescription> this page is for the pit scouting</CardDescription>
  </CardHeader>
<CardContent>
<div className="grid gap-3">
<Label>How much fuel can they carry</Label>
<Input
id="fuelCount"
type="number"
required
placeholder='1234'
value={formData.maxFuelCarry}
onChange={(e) => {setFormData({...formData, Number: e.target.value})}}
/>
</div>
<div>
    <Label>what position do they pass in</Label>
    <Input
  id="PassPosition"
  type="number"
  required
  placeholder="1234"
  value={formData.maxFuelCarry}
  onChange={(e) => {setFormData({...formData, Number: e.target.value})}}
    />
</div>
<div>
    <Label>what position do they score in?</Label>
    <Input
id="scoringPosition"
type="number"
required
placeholder="123456"
  value={formData.scoringPosition}
  onChange={(e) => {setFormData({...formData, Number: e.target.value})}}
/>
</div>
<div>
    <Label>what is their auton path</Label>
<Input
id="autonPath"
type="srting"
required
placeholder="123456"
  value={formData.autonPath}
  onChange={(e) => {setFormData({...formData, Number: e.target.value})}}
/>


</div>

</CardContent>



    
  
   </Card>
</>
)
}

export default Page