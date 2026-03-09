'use client'

import {Card, CardDescription} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { IMatchscout,  Matchscoutschema } from "@/models/frc-events/matchScout/matchScout"
    
    const page = () => {

       
return(
<div className="grid gap-3">
    <Card>
<CardDescription>the match results of each team</CardDescription>
   <div className="text-center">
    <Label>match results</Label>
   
   </div>
    </Card>
</div>

)
    }
    export default page
