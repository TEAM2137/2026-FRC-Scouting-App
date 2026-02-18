import mongoose from 'mongoose';


import { ITeam, TeamSchema } from '@/models/frc-events/Team';



export interface IEvent {
            code: string,
            divisionCode: string,
            name: string,
            type: string,
            districtCode: string,
            city: string,
            stateprov: string,
            country: string,
            dateStart: Date,
            dateEnd: Date,
            teams: ITeam[],
        }



const EventSchema = new mongoose.Schema<IEvent>({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    divisionCode: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    districtCode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    stateprov: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    teams: {
        type: [TeamSchema],
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
});

const Event = mongoose.models?.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;