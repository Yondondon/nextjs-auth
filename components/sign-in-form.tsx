'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "@/lib/auth-client";
import {toast} from "sonner";
import {SubmitHandler, useForm} from "react-hook-form";

interface SignInFormProps {
  email: string;
  password: string;
  remember: boolean;
}

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors
  } = useForm<SignInFormProps>({
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit: SubmitHandler<SignInFormProps> = async (data) => {
    console.log(data)
    return
    await signIn.email({
      email,
      password,
      rememberMe,
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.replace("/");
        }
      },
    });
  }

  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email is invalid'
                    }
                  })}
                  onChange={() => {
                    clearErrors("email");
                  }}
                  placeholder="m@example.com"
                  defaultValue=""
              />
              {errors.email && <span>{errors.email.message || ''}</span>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                  id="remember"
                  onClick={() => {
                    setRememberMe(!rememberMe);
                  }}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={loading}
                // onClick={async () => {
                //   await signIn.email({
                //     email,
                //     password,
                //     rememberMe,
                //     fetchOptions: {
                //       onRequest: () => {
                //         setLoading(true);
                //       },
                //       onResponse: () => {
                //         setLoading(false);
                //       },
                //       onError: (ctx) => {
                //         toast.error(ctx.error.message);
                //       },
                //       onSuccess: () => {
                //         router.replace("/");
                //       }
                //     },
                //   });
                // }}
            >
              {loading ? (
                  <Loader2 size={16} className="animate-spin"/>
              ) : (
                  <p>Login</p>
              )}
            </Button>
          </div>
        </form>
      </>
  )
}