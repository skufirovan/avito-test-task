import { Controller, type Control, type FieldPath } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/Field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select"

type Option = {
  value: string
  label: string
}

type Props<T extends Record<string, unknown>> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  id: string
  options: Option[] | Record<string, string>
}

export function SelectFieldController<T extends Record<string, unknown>>({
  control,
  name,
  label,
  placeholder = "Выберите значение",
  id,
  options,
}: Props<T>) {
  const optionsArray = Array.isArray(options)
    ? options
    : Object.entries(options).map(([value, label]) => ({ value, label }))

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
            <FieldContent>
              <FieldLabel htmlFor={id}>{label}</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>

            <Select
              name={field.name}
              value={inputValue}
              onValueChange={field.onChange}
            >
              <SelectTrigger id={id} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                {optionsArray.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )
      }}
    />
  )
}
