import {Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, } from "../ui/card"
import { Button } from "../ui/button"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { IUser } from "@/models/auth/User"
import storeUser from "@/lib/auth/storeUser" 
import User from "@/models/auth/User"
const Dashboard = () => {
  const [display, setDisplay] = useState('')



const getcurrentUser =) => {
  const user = await User.getCurrentUser();
  
}










  return (
        <Card className="flex flex-col items-center justify-center w-screen h-screen">
            <CardHeader>
                <CardTitle className="text-2xl">Welcome to the Dashboard</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Please select your role to continue.
                </CardDescription>
            </CardHeader>
            
            
            <CardContent className="flex flex-col gap-4">
            </CardContent>
        </Card>
  
  )};

  export default Dashboard;