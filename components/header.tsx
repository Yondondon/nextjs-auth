import {ModeToggle} from "@/components/mode-toggle";
import {SignOutButton} from "@/components/sign-out-button";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
      <div className={'px-4 w-full flex py-2'}>
        <div className={'ml-auto'}>
          <ModeToggle/>
        </div>
        {session && <div className={'ml-2'}>
            <SignOutButton/>
        </div>}
      </div>
  )
}