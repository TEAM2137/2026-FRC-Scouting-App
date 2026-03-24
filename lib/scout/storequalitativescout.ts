'use server'


import connectDB from "@/lib/db"
import QualitativeScout from "@/models/scout/QualitativeScout"
import { IQualitativeScout } from "@/models/scout/QualitativeScout"

export default async function storeQualitativeScout(QualitativeScout: IQualitativeScout) {

await connectDB()
try{
    const store = await QualitativeScout.findOneAndUpdate({QualitativeScoutID: QualitativeScout.qualitativeScoutID}, QualitativeScout, {upsert: true, new: true})
return({result: true, message: "Pit scout report stored sucessfully."})
}catch (error){
    return ({result: false, message: "Error Occured, Could Not Store pit scout report."})
}

}