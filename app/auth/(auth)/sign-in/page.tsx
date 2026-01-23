import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {SignInForm} from "@/components/form/sign-in-form";
import Link from "next/link";

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
          <CardFooter>
            <CardDescription className={'text-center w-full'}>Don&apos;t have an account? <Link
                className={'underline'}
                href={'/auth/sign-up'}>Sign
              up</Link></CardDescription>
          </CardFooter>
        </Card>
      </div>
  );
}