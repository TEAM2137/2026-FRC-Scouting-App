'use server'


import connectDB from '@/lib/db';
import Example from '@/models/example/Example';
import { IExample } from '@/models/example/Example';
import TeamAdmin from '@/models/auth/TeamAdmin';
import { ITeamAdmin } from '@/models/auth/TeamAdmin';

export const storeExample = async (exampleDATA: IExample) => {
    try {
        await connectDB();
        const result = await Example.findOneAndUpdate({ idVariable: exampleDATA.idVariable }, exampleDATA, { upsert: true });
        if (result) {
            return ({ success: true, message: 'Example stored successfully' });
        }
        return ({ success: false, message: 'Example no stored successfully' });
    } catch (err) {
        console.log(err);
        return ({ success: false, message: 'Error storing Example' });
    }
}

export const getExample = async (idVariable: string) => {
    try {
        await connectDB();
        const result = await Example.findOne({ idVariable: idVariable });
        if (result) {
            return ({ success: true, message: 'Example found successfully', data: JSON.stringify(result) });
        }
        return ({ success: false, message: 'Example not found successfully', data: '' });
    } catch (err) {
        console.log(err);
        return ({ success: false, message: 'Error retrieving Example', data: '' });
    }
}


export const getAllExamples = async () => {
    try {
        await connectDB();
        const result = await Example.find();
        if (result) {
            return ({ success: true, message: 'All examples found successfully', data: JSON.stringify(result) });
        }
        return ({ success: false, message: 'No examples found successfully', data: '' });
    } catch (err) {
        console.log(err);
        return ({ success: false, message: 'Error retrieving all examples', data: '' });
    }
}

export const updateExample = async (idVariable: string, exampleDATA: IExample) => {
    try {
        await connectDB();
        const result = await Example.findOneAndUpdate({ idVariable: idVariable }, exampleDATA, { upsert: true });
        if (result) {
            return ({ success: true, message: 'Example updated successfully' });
        }
        return ({ success: false, message: 'Example not updated successfully' });
    } catch (err) {
        console.log(err);
        return ({ success: false, message: 'Error updating Example' });
    }
}

export const deleteExample = async (idVariable: string) => {
    try {
        await connectDB();
        const result = await Example.deleteOne({ idVariable: idVariable });
        if (result) {
            return ({ success: true, message: 'Example deleted successfully' });
        }
        return ({ success: false, message: 'Example not deleted successfully' });
    } catch (err) {
        console.log(err);
        return ({ success: false, message: 'Error deleting Example' });
    }
}

export const signUpTeamAdmin = async (adminData: ITeamAdmin) => {
    try {
        await connectDB();
        // Check if team already exists
        const existingTeam = await TeamAdmin.findOne({ teamNumber: adminData.teamNumber });
        if (existingTeam) {
            return ({ success: false, message: 'Team number already registered' });
        }
        // Check if email already exists
        const existingEmail = await TeamAdmin.findOne({ managerEmail: adminData.managerEmail });
        if (existingEmail) {
            return ({ success: false, message: 'Email already registered' });
        }
        // TODO: Hash the password before saving (use bcrypt)
        const newAdmin = new TeamAdmin(adminData);
        await newAdmin.save();
        return ({ success: true, message: 'Team admin registered successfully', data: newAdmin._id });
    } catch (err) {
        console.error(err);
        return ({ success: false, message: 'Error registering team admin' });
    }
}