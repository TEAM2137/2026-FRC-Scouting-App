'use server'
import connectDB from "@/lib/db"
import Matchscout from "@/models/frc-events/matchScout/matchScout";
import { IMatchscout } from "@/models/frc-events/matchScout/matchScout";

async function run() {
  // Connect to your MongoDB instance
  await connectDB();

  // Pull all users
  const allUsers = await Matchscout.find(); 
 
const find = await Matchscout.findOne({})

  const user = await Matchscout.findOne({ teamNumber: "12345" });

}  

run().catch(err => console.log(err));