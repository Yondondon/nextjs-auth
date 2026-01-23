import {useFormContext} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";

interface Props {
  label?: string;
  fieldId: string;
  required?: boolean;
  placeholder?: string;
  validationPattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

export const InputField = (props: Props) => {
  const {register, clearErrors, formState, getFieldState} = useFormContext()
  const fieldState = getFieldState(props.fieldId, formState)

  return (
      <Field className={'relative'}>
        {props.label && <FieldLabel htmlFor="first-name">First name</FieldLabel>}
        <Input
            {...register(props.fieldId, {
              ...(props.required ? {required: "This field is mandatory",} : {}),
              ...(props.minLength ? {minLength: props.minLength} : {}),
              ...(props.maxLength ? {maxLength: props.maxLength} : {}),
              ...(props.validationPattern ? {
                pattern: {
                  value: props.validationPattern,
                  message: 'Only letters, spaces, hyphens, and apostrophes are allowed'
                }
              } : {}),
            })}
            aria-invalid={fieldState.invalid}
            onChange={() => {
              clearErrors(props.fieldId);
            }}
            placeholder={props.placeholder || ""}
            defaultValue=""
        />
        {fieldState.error && <FieldError>{fieldState.error.message || ''}</FieldError>}
      </Field>
  )
}