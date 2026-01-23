import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {SignUpForm} from "@/components/form/sign-up-form";
import Link from "next/link";


export default function SignUpPage() {
  return (
      <div className="flex justify-center pt-10">
        <Card className="z-50 rounded-md max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm/>
          </CardContent>
          <CardFooter>
            <CardDescription className={'text-center w-full'}>Already have an account? <Link
                className={'underline'}
                href={'/auth/sign-in'}>Sign
              in</Link></CardDescription>
          </CardFooter>
        </Card>
      </div>
  );
}