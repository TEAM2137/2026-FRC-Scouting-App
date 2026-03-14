'use server'

import connectDB from "@/lib/db"
import MatchSummary from "@/models/insights/MatchSummary"
import { IMatchSummary } from "@/models/insights/MatchSummary"


export default async function storeMatchSummary(matchSummary: IMatchSummary) {
    await connectDB()
  try {
    const store = await MatchSummary.findOneAndUpdate({ scoutKey: matchSummary.scoutKey }, matchSummary, { upsert: true, new: true })
    // const store = await ({fuelScored: match.IFuelNumb})
    return ({result: true, message: "stored Match Summary"})
  } catch (error) {
    console.log(error)
    return ({result: false, message: "something went wrong"})
    
  }
}   