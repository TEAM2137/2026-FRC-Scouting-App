import mongoose from "mongoose";

interface ITeam {
    "teamNumber": number;
    "teamName": string;
    "city": string;
    "stateProv": string;
    "country": string;
    "nameFull": string;
    "nameShort": string;
    "rookieYear": number;
    "robotName": string;
    "districtCode": string;
    "schoolName": string;
    "website": string;
    "homeCMP": string | null;
}

const teamSchema = new mongoose.Schema<ITeam>({
 "teamNumber":{
    type: Number,
    required: true,
    unique: true
 },
 "teamName": {
    type: String,
    required: true },
 "city": {
    type: String,
    required: true },
 "stateProv": {
    type: String,
    required: true },
 "country": {
    type: String,
    required: true },
 "nameFull": {
    type: String,
    required: true },
 "nameShort": {
    type: String,
    required: true },
 "rookieYear": {
    type: Number,
    required: true },
 "robotName": {
    type: String,
    required: true },
 "districtCode": {
    type: String,
    required: true },
 "schoolName": {
    type: String,
    required: true },
 "website": {
    type: String,
    required: true },
 "homeCMP": {
    type: String,
    required: false }


});
const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
export default Team;