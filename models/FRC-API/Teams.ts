import mongoose from "mongoose";

interface ITeam {
    "teamNumber": number,
    "nameFull": string,
    "nameShort": string,
    "city": string,
    "stateProv": string,
    "country": string,
    "rookieYear": number,
    "robotName": string,
    "districtCode": string,
    "schoolName": string,
    "website": string,
    "homeCMP": string
}

const TeamSchema = new mongoose.Schema<ITeam>(
    {
        "teamNumber": {
            type: Number,
            required: true,
            unique: true
        },
        "nameFull": {
            type: String,
            required: true
        },
        "nameShort": {
            type: String,
            required: true
        },
        "city": {
            type: String,
            required: true
        },
        "stateProv": {
            type: String,
            required: true
        },
        "country": {
            type: String,
            required: true
        },
        "rookieYear": {
            type: Number,
            required: true
        },
        "robotName": {
            type: String,
            required: true
        },
        "districtCode": {
            type: String,
            required: true
        },
        "schoolName": {
            type: String,
            required: true
        },
        "website": {
            type: String,
        },
        "homeCMP": {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.models?.Team || mongoose.model("Team", TeamSchema);

export default Team;