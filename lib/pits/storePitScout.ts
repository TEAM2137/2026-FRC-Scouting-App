'use server'


import connectDB from "@/lib/db"
import { IPitscout } from "@/models/PitScout/pitscout"
import Pitscout from "@/models/PitScout/pitscout"

export default async function storePitScout(pitScout: IPitscout) {

await connectDB()
try{
    const store = await Pitscout.findOneAndUpdate({teamnumber: pitScout.teamNumber}, pitScout, {upsert: true, new: true})
return({result: true, message: "Pit scout stored sucessfully"})
}catch (error){
    return ({result: false, message: "Error Occured, Could Not Store pit scout "})
}







}