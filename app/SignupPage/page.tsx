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
import { hashedPassword } from "@/lib/ServerSideFunctions"
interface Signup {
  teamNumber: string;
  managerName: string;
  managerEmail: string;
  managerPassword: string;
  managerPhoneNumber: string;
  roleOnTeam: string;
}
 
const Page = () => {
  const [formData, setFormData] = useState<Signup>({
    teamNumber: '',
    managerName: '',
    managerEmail: '',
    managerPassword: '',
    managerPhoneNumber: '',
    roleOnTeam: '',
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
       id === 'name' ? 'managerName' : 
       id === 'email' ? 'managerEmail' : 
       id === 'password' ? 'managerPassword' : 
       id === 'PhoneNumber' ? 'managerPhoneNumber' : 
       id === 'role' ? 'roleOnTeam' : id]: value
    }));
    setError(''); // Clear error when user starts typing
  };
 
  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.teamNumber) {
      setError("Please enter your Team Number");
      return;
    }

    if (!formData.managerName) {
      setError("Please enter your Manager Name");
      return;
    }

    if (!formData.managerEmail) {
      setError("Please enter your Manager Email");
      return;
    }

    if (!formData.managerPassword) {
      setError("Please enter a Password");
      return;
    }

    if (!formData.managerPhoneNumber) {
      setError("Please enter your Phone Number");
      return;
    }

    if (!formData.roleOnTeam) {
      setError("Please select your Role on Team");
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
      const hashedPasswordValue = await hashedPassword(formData.managerPassword);
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, managerPassword: hashedPasswordValue }),
      });
        try {      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Account created successfully! You can now sign in.');
        setFormData({
          teamNumber: '',
          managerName: '',
          managerEmail: '',
          managerPassword: '',
          managerPhoneNumber: '',
          roleOnTeam: '',
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
  }
   catch( err ) {
    console.log(err)
   }}
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
          <form onSubmit={handleFormSubmit}>
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
                <Label htmlFor="name">Manager Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  required 
                  placeholder="John Smith"
                  value={formData.managerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Manager Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email@Email.com"
                  required
                  value={formData.managerEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Manager Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value={formData.managerPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="PhoneNumber">Manager Phone Number</Label>
                <Input 
                  id="PhoneNumber" 
                  type="tel" 
                  placeholder="123-456-7890" 
                  required
                  value={formData.managerPhoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Role on team</Label>
                <select 
                  id="role" 
                  required
                  value={formData.roleOnTeam}
                  onChange={handleInputChange}
                  className="rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">Select your role</option>
                  <option value="manager">FIRST Lead Mentor</option>
                  <option value="coach">Adult Mentor on Team</option>
                  <option value="scout">Student Leader on Team</option>
                </select>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox 
                  className="h-6 w-6 text-green-500 mt-1" 
                  required
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm">I am responsible for my and my teams actions. By using this app, your team will not add bad data into the database and will input data that is meaningful to the database</label>
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
}
export default Page;


