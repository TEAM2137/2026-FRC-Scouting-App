'use client'
import { Input } from "../ui/input"
import { Label } from "../ui/label"
export default function Qualitative() {
    return (
        <div className="flex flex-col gap-4">
            <Label className="text-2xl font-bold">Qualitative Data</Label>         
            <Input type="text" placeholder="Enter any additional notes about the team" />
            <div className="text-2xl font-bold">Qualitative Data</div>
            <div className="text-sm italic">This section is for any qualitative data that may be useful for the team. This can include things like driver skill, robot reliability, and any other notes that may be useful for the team.</div>
            <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">Driver Skill</div>
                <div className="text-sm italic">This is a subjective rating of the driver's skill. It can be based on things like how well they control the robot, how well they can navigate the field, and how well they can work with their alliance partners.</div>
                <Input type="text" placeholder="Enter driver skill rating (e.g. 1-10)" />
                </div>      
            <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">Robot Reliability</div>
                <div className="text-sm italic">This is a subjective rating of the robot's reliability. It can be based on things like how often the robot breaks down, how well it can recover from breakdowns, and how well it can perform its tasks.</div>
               <Input type="text" placeholder="Enter robot reliability rating (e.g. 1-10)" />
              
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">Additional Notes</div>
                <div className="text-sm italic">This is a free-form text field where you can enter any additional notes about the team that may be useful for the team. This can include things like strategy, alliance preferences, and any other notes that may be useful for the team.</div>
               <Input type="text" placeholder="Enter any additional notes about the team" />
               </div>
        </div>
    )
}
