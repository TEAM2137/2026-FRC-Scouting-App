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
  PassPosition: false,
  scoringPosition: 0,
  autonPath: '',
  canGoThroughTrench: false,
  intakeType: '',
  autonClimb: 0,
  closedHopper: false,
  multishot: 0,
  teleopClimb: 0,
  launchSpeed: 0,
  weight: 0,
  //meta data for the file. 
  createdAt: new Date(),
  updatedAt: new Date(),
teamNumber: 0,
eventCode: '',
driveTeam: '',




})
     
    const router = useRouter();
    const { appEvent, setAppEvent } = useAppContext();
    
const handleStorePitScout = async () => {








  
}
    
return (
    <>
   
   
   
   <Card className="fixed top-0 left-0 w-screen h-screen z-11">
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
onChange={(e) => {setFormData({...formData, maxFuelCarry: e.target.valueAsNumber})}}
/>
</div>
<div>
    <Label>what position do they pass in</Label>
    <Input
  id="PassPosition"
  type="number"
  required
  placeholder="1234"
  value={formData.PassPosition}
  onChange={(e) => {setFormData({...formData, PassPosition: e.target.value})}}
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
  onChange={(e) => {setFormData({...formData, scoringPosition: e.target.valueAsNumber})}}
/>
</div>
<div>
    <Label>what is their auton path</Label>
<Input
id="autonPath"
type="srting"
required
placeholder="no"
  value={formData.autonPath}
  onChange={(e) => {setFormData({...formData, autonPath: e.target.value})}}
/>
</div>
<div>
<Label>can they go through the trench</Label>
<Checkbox>yes they do</Checkbox>

</div>
<div className=''>
  <Label>What is their intake type</Label>
  <select
id="intake Type"
required
value={formData.intakeType}
  onChange={(e) => {setFormData({...formData, intakeType: e.target.value})}}
className='rounded border border-black-100 px-3 py-2'
>
  <option value="">select</option>
  <option value="in bumper">in bumper intake</option>
  <option value="over bumper">over the bumper intake.</option>
  </select>
</div>
<div>
<Label>what is the robot weight</Label>
<Input
id='weight'
required
value={formData.weight}
onChange={(e) => {setFormData({...formData, weight: e.target.valueAsNumber})}}
>
</Input>
</div>

<div>
  <Label>can they go through the trench?</Label>
<Checkbox>
  yes they can 
</Checkbox>
</div>

<div>
<Label>what is their Intake type</Label>
<Input
id="intakeType"
type="text"
required
placeholder="in bumper, over bumper, etc."
value={formData.intakeType}
onChange={(e) => {setFormData({...formData, intakeType: e.target.value})}} //change form data once we change the forms
/>
</div>

<div>
<Label>Do they climb in auton</Label>
<Checkbox
checked={formData.autonClimb === 1}
onChange={(e) => {setFormData({...formData, autonClimb: e.target.checked ? 1 : 0})}}
/>
</div>
<div>
<Label>Do they have a closed hopper?</Label>
<Checkbox
checked={formData.closedHopper}
onChange={(e) => {setFormData({...formData, closedHopper: e.target.checked})}}
/>
</div>
<div> 
  <Label>How many fuel do they launch at one time?</Label>
<Input
id="launchSpeed"
type="number"
required
placeholder="123456"
  value={formData.launchSpeed}
  onChange={(e) => {setFormData({...formData, launchSpeed: e.target.valueAsNumber})}}
/>
</div>
</CardContent>
   </Card>
</>
)
}

export default Page