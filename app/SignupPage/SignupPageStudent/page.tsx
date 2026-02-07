'use client';

import mongoose from "mongoose"
import { useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import SignInForm from "@/components/auth/SignInForm"
import { Database } from "lucide-react";
import { exists } from "fs";

interface Signup {
  teamNumber: string;
  StudentName: string;
  StudentEmail: string;
  StudentPassword: string;
}

const Page = () => {
  const [formData, setFormData] = useState<Signup>({
    teamNumber: '',
    StudentName: '',
    StudentEmail: '',
    StudentPassword: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'TeamNumber' ? 'teamNumber' : 
       id === 'name' ? 'StudentName' : 
       id === 'email' ? 'StudentEmail' : 
       id === 'password' ? 'StudentPassword' : id]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleFormSubmitStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    // Validate all fields are filled
    if (!formData.teamNumber) {
      setError("Please enter your Team Number");
      return;
    }

    if (!formData.StudentName) {
      setError("Please enter your Student Name");
      return;
    }

    if (!formData.StudentEmail) {
      setError("Please enter your Student Email");
      return;
    }

    if (!formData.StudentPassword) {
      setError("Please enter a Password");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/signup/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Account created successfully! You can now sign in.');
        setFormData({
          teamNumber: '',
          StudentName: '',
          StudentEmail: '',
          StudentPassword: '',
        });
        setTermsAccepted(false);
        // Optionally redirect to sign in page after a delay
        setTimeout(() => {
          window.location.href = '/'; // Adjust path as needed
        }, 2000);
      } else {
        setError(data.message || 'Failed to create account');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred while creating your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up for an Account</CardTitle>
          <CardDescription>Create your account by filling the form below.</CardDescription>
          <CardAction>
            <Button variant="link">Already have an account? Sign In</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmitStudent}>
            <div className="flex flex-col gap-3">
              {error && (
                <div className="rounded bg-red-100 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded bg-green-100 p-3 text-sm text-green-700">
                  {success}
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="TeamNumber">Team Number</Label>
                <Input 
                  id="TeamNumber" 
                  type="text" 
                  required 
                  placeholder="12345"
                  value={formData.teamNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Student Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  required 
                  placeholder="John Smith"
                  value={formData.StudentName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Student Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email@Email.com"
                  required
                  value={formData.StudentEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Student Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value={formData.StudentPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox 
                  className="h-6 w-6 text-green-500 mt-1" 
                  required
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm">I am responsible for any actions taken on this app and any data I input into the database.</label>
              </div>
              <div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </div>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
  
  
  
  
  
  
  
  );
  };

export default Page;