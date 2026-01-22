import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {SignOutButton} from "@/components/sign-out-button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/auth/sign-in")
  }

  return (
      <>
        <div>Hello, {session.user.name}!</div>
        <SignOutButton/>
      </>
  )
}