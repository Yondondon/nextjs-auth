import {Input} from "@/components/ui/input";
import {useFormContext} from "react-hook-form";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";

interface Props {
  label?: string;
  fieldId: string;
  placeholder?: string;
  validationPattern?: RegExp;
}

export const PasswordField = (props: Props) => {
  const {register, clearErrors, formState, getFieldState} = useFormContext()
  const fieldState = getFieldState(props.fieldId, formState)

  return (
      <Field className={'relative'}>
        {props.label && <FieldLabel htmlFor="password">{props.label}</FieldLabel>}
        <Input
            className={''}
            {...register(props.fieldId, {
              required: "This field is mandatory",
              ...(props.validationPattern ? {
                pattern: {
                  value: props.validationPattern,
                  message: 'Should be min 8 chars and contain at least 1 letter and 1 number'
                }
              } : {}),
            })}
            type={"password"}
            aria-invalid={fieldState.invalid}
            onChange={() => {
              clearErrors(props.fieldId);
            }}
            placeholder={props.placeholder || ""}
            defaultValue=""
        />
        {fieldState.error &&
            <FieldError>{fieldState.error.message || ''}</FieldError>}
      </Field>
  )
}