'use server'
import connectDB from "@/lib/db"
import Matchscout from "@/models/frc-events/matchScout/matchScout";


async function run() {
  // Connect to your MongoDB instance
  await connectDB();

  // Pull all users
  const allUsers = await Matchscout.find(); 
  console.log(allUsers[0].name); // TypeScript knows .name exists!

  // Pull a specific user by email
  const user = await Matchscout.findOne({ teamNumber: "12345" });
  
  if (Matchscout) {
    console.log(`Found: ${Matchscout.teamNumber}`);
  }
}

run().catch(err => console.log(err));