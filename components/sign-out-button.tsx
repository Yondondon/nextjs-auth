'use client'
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  return (
      <Button onClick={async () => await authClient.signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            router.replace("/auth/sign-in");
          },
        },
      })}>Sign Out</Button>
  )
}