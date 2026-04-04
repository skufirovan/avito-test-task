import type { Control } from "react-hook-form"
import { Controller } from "react-hook-form"
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
import { transmissionMapper } from "@/lib/mappers"
import type { FormValues } from "./AdEditForm"
import { FormFieldController } from "./FormFieldController"

type Props = {
  control: Control<FormValues>
}

export function AutoParamsFields({ control }: Props) {
  return (
    <>
      <FormFieldController
        control={control}
        name="params.brand"
        label="Бренд"
        id="form-auto-brand"
      />

      <FormFieldController
        control={control}
        name="params.model"
        label="Модель"
        id="form-auto-model"
      />

      <FormFieldController
        control={control}
        name="params.yearOfManufacture"
        label="Год выпуска"
        id="form-auto-year"
        type="number"
      />

      <Controller
        name="params.transmission"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-auto-transmission">КПП</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>

            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="form-auto-transmission"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Выберите тип КПП" />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                {Object.entries(transmissionMapper).map(([key, value]) => (
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
        name="params.mileage"
        label="Пробег"
        id="form-auto-mileage"
        type="number"
      />

      <FormFieldController
        control={control}
        name="params.enginePower"
        label="Мощность"
        id="form-auto-engine-power"
        type="number"
      />
    </>
  )
}
