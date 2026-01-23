import {useFormContext} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";

export const EmailField = () => {
  const {register, clearErrors, formState, getFieldState} = useFormContext()
  const fieldState = getFieldState('email', formState)

  return (
      <Field className={'relative'}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
            {...register("email", {
              required: "This field is mandatory",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email is invalid. Should be like: some@email.com'
              }
            })}
            type="email"
            aria-invalid={fieldState.invalid}
            onChange={() => {
              clearErrors("email");
            }}
            placeholder="m@example.com"
            defaultValue=""
        />
        {fieldState.error && <FieldError>{fieldState.error.message || ''}</FieldError>}
      </Field>
  )
}