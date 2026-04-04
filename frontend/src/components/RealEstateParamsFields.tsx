import { Controller, type Control } from "react-hook-form"
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
} from "@/components/ui/Select"
import { realEstateTypeMapper } from "@/lib/mappers"
import type { FormValues } from "./AdEditForm"
import { FormFieldController } from "./FormFieldController"

type Props = {
  control: Control<FormValues>
}

export function RealEstateParamsFields({ control }: Props) {
  return (
    <>
      <Controller
        name="params.type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-real-estate-type">Тип</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>

            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="form-real-estate-type"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Выбери тип недвижимости" />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                {Object.entries(realEstateTypeMapper).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <FormFieldController
        control={control}
        name="params.address"
        label="Адрес"
        id="form-real-estate-address"
      />

      <FormFieldController
        control={control}
        name="params.area"
        label="Площадь"
        id="form-real-estate-area"
        type="number"
      />

      <FormFieldController
        control={control}
        name="params.floor"
        label="Этаж"
        id="form-real-estate-floor"
        type="number"
      />
    </>
  )
}
