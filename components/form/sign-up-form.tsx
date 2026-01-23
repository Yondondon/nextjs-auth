'use client'

import {useRouter} from "next/navigation";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {InputField} from "@/components/form/input-field";
import {EmailField} from "@/components/form/email-field";
import {PasswordField} from "@/components/form/password-field";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {signUp} from "@/lib/auth-client";
import {FieldGroup} from "@/components/ui/field";

interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nameRegex = /^\p{L}+([ '-]\p{L}+)*$/u;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  const methods = useForm<SignUpFormProps>({
    mode: "onChange",
    reValidateMode: "onChange",
  })
  const {handleSubmit} = methods
  const onSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      methods.setError('password', {message: 'Password mismatch'});
      methods.setError('passwordConfirmation', {message: 'Password mismatch'});
      return
    }
    await signUp.email({
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      callbackURL: "/",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }

  return (
      <>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FieldGroup className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <InputField
                      label={"First name"}
                      fieldId={"firstName"}
                      required
                      placeholder={"Max"}
                      validationPattern={nameRegex}
                      minLength={1}
                      maxLength={30}
                  />
                </div>
                <div className="grid gap-2">
                  <InputField
                      label={"Last name"}
                      fieldId={"lastName"}
                      required
                      placeholder={"Robinson"}
                      validationPattern={nameRegex}
                      minLength={1}
                      maxLength={30}
                  />
                </div>
              </FieldGroup>
              <div className="grid gap-2">
                <EmailField/>
              </div>
              <div className="grid gap-2">
                <PasswordField
                    label={"Password"}
                    fieldId={"password"}
                    placeholder={"password"}
                    validationPattern={passwordRegex}
                />
              </div>
              <div className="grid gap-2">
                <PasswordField
                    label={"Confirm Password"}
                    fieldId={"passwordConfirmation"}
                    placeholder={"confirm password"}
                    validationPattern={passwordRegex}
                />
              </div>
              <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={loading}
              >
                {loading ? (
                    <Loader2 size={16} className="animate-spin"/>
                ) : (<span>Create your account</span>)}
              </Button>
            </div>
          </form>
        </FormProvider>
      </>
  )
}