import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useState } from "react"
const  AlliancePickform = () => {
   const sendtoDB = () => {
    //send to db
   }
   const [data, setData] = useState({
    PickListName: "",
    eventCode: "",
    picks: []
   })
   
 return (
    <Card>
        <CardContent>
            <Label>Alliance Pick Name</Label>
            <Input placeholder="Alliance Pick list Name" required onChange={(e) => {setData({...data, PickListName: e.target.value})}}/>
            
            
            <Button onClick={sendtoDB}>Submit</Button>
        </CardContent>
    </Card>


 )}