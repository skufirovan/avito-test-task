import { Controller, type Control, type FieldPath } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"

type Props<T extends Record<string, unknown>> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  id: string
  type?: "text" | "number"
}

export function InputFieldController<T extends Record<string, unknown>>({
  control,
  name,
  label,
  id,
  type = "text",
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const inputValue =
          field.value === undefined || field.value === null
            ? ""
            : String(field.value)

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input
              id={id}
              type={type}
              value={inputValue}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onChange={(event) => {
                const value = event.target.value

                if (type === "number") {
                  field.onChange(value === "" ? undefined : Number(value))
                  return
                }

                field.onChange(value === "" ? undefined : value)
              }}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
