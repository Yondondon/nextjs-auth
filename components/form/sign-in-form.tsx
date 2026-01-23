'use client'
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "@/lib/auth-client";
import {toast} from "sonner";
import {Controller, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {EmailField} from "@/components/form/email-field";
import {PasswordField} from "@/components/form/password-field";
import {FieldGroup} from "@/components/ui/field";

interface SignInFormProps {
  email: string;
  password: string;
  remember: boolean;
}

export const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const methods = useForm<SignInFormProps>({
    mode: "onChange",
    reValidateMode: "onChange",
  })
  const {handleSubmit, control} = methods
  const onSubmit: SubmitHandler<SignInFormProps> = async (data) => {
    await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.remember,
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="grid gap-4">
              <div className="grid gap-2">
                <EmailField/>
              </div>
              <div className="grid gap-2">
                <PasswordField
                    label={"Password"}
                    fieldId={"password"}
                    placeholder={"password"}
                />
              </div>
              <div className="flex items-center gap-2">
                <Controller
                    control={control}
                    name="remember"
                    render={({field: {onChange}}) => (
                        <Checkbox
                            id="remember"
                            onCheckedChange={onChange}
                        />
                    )}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
              >
                {loading ? (
                    <Loader2 size={16} className="animate-spin"/>
                ) : (<span>Login</span>)}
              </Button>
            </FieldGroup>
          </form>
        </FormProvider>
      </>
  )
}