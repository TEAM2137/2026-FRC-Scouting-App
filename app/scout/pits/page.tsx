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
import storePitScout from '@/lib/pits/storePitScout';



const Page = () => {
   const [data, setData] = useState<IPitscout>({
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

try {
  const response = await storePitScout(data)
  if (response.result){
    setSuccess('save successful');
  emptyForm
  }
}






  
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
value={data.maxFuelCarry}
onChange={(e) => {setData({...data, maxFuelCarry: e.target.valueAsNumber})}}
/>
</div>
<div>
    <Label>what position do they pass in</Label>
   <Checkbox>
    yes
   </Checkbox>
</div>
<div>
    <Label>what position do they score in?</Label>
    <Input
id="scoringPosition"
type="number"
required
placeholder="123456"
  value={data.scoringPosition}
  onChange={(e) => {setData({...data, scoringPosition: e.target.valueAsNumber})}}
/>
</div>
<div>
    <Label>what is their auton path</Label>
<Input
id="autonPath"
type="srting"
required
placeholder="no"
  value={data.autonPath}
  onChange={(e) => {setData({...data, autonPath: e.target.value})}}
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
value={data.intakeType}
  onChange={(e) => {setData({...data, intakeType: e.target.value})}}
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
value={data.weight}
onChange={(e) => {setData({...data, weight: e.target.valueAsNumber})}}
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
value={data.intakeType}
onChange={(e) => {setData({...data, intakeType: e.target.value})}} //change form data once we change the forms
/>
</div>

<div>
<Label>Do they climb in auton</Label>
<Checkbox
checked={data.autonClimb === 1}
onChange={(e) => {setData({...data, autonClimb: e.target.checked ? 1 : 0})}}
/>
</div>
<div>
<Label>Do they have a closed hopper?</Label>
<Checkbox
checked={data.closedHopper}
onChange={(e) => {setData({...data, closedHopper: e.target.checked})}}
/>
</div>
<div> 
  <Label>How many fuel do they launch at one time?</Label>
<Input
id="launchSpeed"
type="number"
required
placeholder="123456"
  value={data.launchSpeed}
  onChange={(e) => {setData({...data, launchSpeed: e.target.valueAsNumber})}}
/>
</div>

<div>
<Label>what is their teleop climb?</Label>
<Input
id="teleopClimb"
type="number"
required
placeholder="123456"
  value={data.teleopClimb}
  onChange={(e) => {setData({...data, teleopClimb: e.target.valueAsNumber})}}
/>
</div>

<div>
<Label>what is their launch cycle time</Label>
<Input
id="launchCycleTime"
type="number"
required
placeholder="123456"
  value={data.launchSpeed}
  onChange={(e) => {setData({...data, launchSpeed: e.target.valueAsNumber})}}
/>
</div>
<div>
  <Label>What is their robot weight </Label>
  <Input
  id="weight"
  type="number"
  required
  placeholder='123456'
  value={0}
  onChange={() => {}}
  />
</div>

<div>
  <Button onClick={handleStorePitScout}>
    submit
  </Button>
</div>
</CardContent>
   </Card>
</>
)
}

export default Page