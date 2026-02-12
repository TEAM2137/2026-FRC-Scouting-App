'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const SignIn = () => {
    return (
        <Card >
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Sign in to your account to scout!
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default SignIn