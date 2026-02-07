'use server'


import connectDB from '@/lib/db';
import Example from '@/models/example/Example';
import { IExample } from '@/models/example/Example';
import TeamAdmin from '@/models/auth/TeamAdmin';
import { ITeamAdmin } from '@/models/auth/TeamAdmin';
import Student from '@/models/auth/Student';
import { IStudent } from '@/models/auth/Student';

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
export const signupStudent = async (studentData: IStudent) => {
    try {
        await connectDB();
        // Check if team exists
        const team = await TeamAdmin.findOne({ teamNumber: studentData.teamNumber });
        if (!team) {
            return ({ success: false, message: 'Team number not found' });
        }
        // Check if email already exists
        const existingEmail = await Student.findOne({ StudentEmail: studentData.StudentEmail });
        if (existingEmail) {
            return ({ success: false, message: 'Email already registered' });
        }
        // TODO: Hash the password before saving (use bcrypt)
        const newStudent = new Student(studentData);
        await newStudent.save();
        return ({ success: true, message: 'Student registered successfully', data: newStudent._id });
    } catch (err) {
        console.error(err);
        return ({ success: false, message: 'Error registering student' });
    }
}




export const signInTeamAdmin = async (email: string, password: string) => {
    try {
        await connectDB();
        // Find user by email
        const user = await TeamAdmin.findOne({ managerEmail: email });
        if (!user) {
            return ({ success: false, message: 'Invalid email or password' });
        }
        
        // TODO: Implement proper password verification using bcrypt
        // For now, doing a direct comparison (NOT SECURE - replace with bcrypt!)
        if (user.managerPassword !== password) {
            return ({ success: false, message: 'Invalid email or password' });
        }
        return ({ 
            success: true, 
            message: 'Sign in successful', 
            data: { 
                id: user._id, 
                email: user.managerEmail, 
                teamNumber: user.teamNumber,
                managerName: user.managerName
            } 
        });
    } catch (err) {
        console.error(err);
        return ({ success: false, message: 'Error signing in' });
    }
}