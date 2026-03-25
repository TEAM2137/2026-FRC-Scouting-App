'use server'

import { IPickList } from "@/models/scout/AlliancePick"
import PickList from "@/models/scout/AlliancePick"
import connectDB from "@/lib/db"

export default async function storeAlliancePick(pickList: IPickList) {
    await connectDB()   
    try {
        const store = await PickList.findOneAndUpdate(
            { eventCode: pickList.eventCode, PickListName: pickList.PickListName },
            pickList,
            { upsert: true, new: true }
        )
        return { result: true, message: "Alliance pick stored successfully." }
    } catch (error) {
        console.error("Error storing alliance pick:", error)
        throw new Error("Failed to store alliance pick")
    }   
}
