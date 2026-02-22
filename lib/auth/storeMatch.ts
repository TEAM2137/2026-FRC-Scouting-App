'use server'

import connectDB from "@/lib/db"
import { IMatchscout } from "@/models/frc-events/matchScout/matchScout";
import User from "@/models/auth/User"
// import { genSalt, hashSync } from "bcrypt-ts"

export default async function storeMatch(match: IMatchscout) {

    //const salt = await genSalt(10);
    //user.password = hashSync(user.password, salt);

    await connectDB()
  try {
    // const store = await match.findOneAndUpdate({ score: match.IFuelNumb }, match, { upsert: true, new: true })
    // const store = await ({fuelScored: match.IFuelNumb})
    const store = match
    console.log("yay it worked it worked it worked it worked.")
    return ({result: true, message: "User Stored Successfully"})
  } catch (error) {
    //console.log(error)
    return ({result: false, message: "i do not care if this breaks its fro testing"})
    
  }
}