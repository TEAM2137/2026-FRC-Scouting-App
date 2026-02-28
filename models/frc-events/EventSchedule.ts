import mongoose from "mongoose";


interface IMatchTeam {
    teamNumber: number,
    station: string,
    surrogate: boolean
}

interface IEventSchedule {
    matchID: string,
    eventCode: string,
    description: "Qualification 1",
    startTime: Date,
    matchNumber: number,
    field: string,
    tournamentLevel: string,
    teams: IMatchTeam[]
}

const EventScheduleSchema = new mongoose.Schema({
    matchID: {
        type:String,
        required: true,
        unique: true
    },
    eventCode: String,
    description: String,
    startTime: Date,
    matchNumber: Number,
    field: String,
    tournamentLevel: String,
    teams: [
        {
            teamNumber: Number,
            station: String,
            surrogate: Boolean
        }
    ]
});