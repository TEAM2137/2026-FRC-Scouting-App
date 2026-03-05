import mongoose from "mongoose";

export interface IMatchscout {
//totalShotsAuto: number,
//totalPassedAuto: number, 
// Fuel amount for teleop, but Its IFuelNumb because fuel sounds like feel, so thats why its called that
Fuel: number,
// this is TotalScore which sounds like Toe-Tal-Scorn so thats why its named that
TotalScore: number,
//totalHerded: number,
// totalPassedTeleop: number,
// totalShotsTeleop: number,
// Hang level but it needed to sound funny so its is the HangerLevel
HangLevel: number,
// didDie: number,
// idBreak: number
// idAutoClimb: number,
// TF2 reference???!?!?!?
// Its the team number, but I think its funny that in the Schema it says: Meet The Team Number
TeamNumber: number,
//meta data for the file
//createdAt: Date,
//updatedAt: Date,
//The only normal name lol
TeamColor: string,
// Otto the goat
// its Auto but it sounds like otto so thats why its called that.
AutoShots: number,
// originally AutoClimb it got renamed to Otto Climbed because it sounds like that
// This is the auton climb counter
AutoClimbLevel: number,
// This is how much fuel that was scored during auton, so that we can use it for later.
AutoFuel: number,
// another TF2 reference, this time its a reference to the wonderful video: The heavy is dead
// But this is how we check if a robot died during a match
RobotDied: number,
// This is how we check if the robot broke during a match
RobotBroke: number
}

export const Matchscoutschema = new mongoose.Schema<IMatchscout>(
{

        Fuel:{
            type: Number,
            required: true,
        },
        TotalScore:{
            type: Number,
            required: true,
        },
        HangLevel:{
            type: Number,
            required: true,
        },
        TeamNumber:{
            type: Number,
            required: true,
        },
        TeamColor:{
            type: String,
            required: true,
        }, AutoShots:{
            type: Number,
            required: false,
        }, AutoClimbLevel:{
            type: Number,
            required: false,
        }, AutoFuel:{
            type: Number,
            required: false,
        }, RobotDied:{
            type: Number,
            required: false,
        }, RobotBroke:{
            type: Number,
            required: false,
        }

    }
)
const Matchscout = mongoose.models?.Matchscout || mongoose.model<IMatchscout>("Matchscout", Matchscoutschema)

export default Matchscout;