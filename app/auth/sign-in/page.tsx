"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SignInForm} from "@/components/sign-in-form";

export default function SignInPage() {
  return (
      <div className="flex justify-center pt-10">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm/>
          </CardContent>
        </Card>
      </div>
  );
}