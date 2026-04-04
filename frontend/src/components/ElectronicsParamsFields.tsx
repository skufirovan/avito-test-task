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
import {
  electronicsConditionMapper,
  electronicsTypeMapper,
} from "@/lib/mappers"
import type { FormValues } from "./AdEditForm"
import { FormFieldController } from "./FormFieldController"

type Props = {
  control: Control<FormValues>
}

export function ElectronicsParamsFields({ control }: Props) {
  return (
    <>
      <Controller
        name="params.type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-electronics-type">Тип</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>

            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="form-electronics-type"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Выбери тип устройства" />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                {Object.entries(electronicsTypeMapper).map(([key, value]) => (
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
        name="params.brand"
        label="Бренд"
        id="form-electronics-brand"
      />

      <FormFieldController
        control={control}
        name="params.model"
        label="Модель"
        id="form-electronics-model"
      />

      <Controller
        name="params.condition"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-electronics-condition">
                Состояние
              </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>

            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="form-electronics-condition"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Выбери состояние" />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                {Object.entries(electronicsConditionMapper).map(
                  ([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <FormFieldController
        control={control}
        name="params.color"
        label="Цвет"
        id="form-electronics-color"
      />
    </>
  )
}
