import { type Control } from "react-hook-form"
import {
  electronicsConditionMapper,
  electronicsTypeMapper,
} from "@/lib/mappers"
import type { FormValues } from "./AdEditForm"
import { InputFieldController } from "./InputFieldController"
import { SelectFieldController } from "./SelectFieldController"

type Props = {
  control: Control<FormValues>
}

export function ElectronicsParamsFields({ control }: Props) {
  return (
    <>
      <SelectFieldController
        control={control}
        name="params.type"
        label="Тип"
        id="form-electronics-type"
        placeholder="Выберите тип устройства"
        options={electronicsTypeMapper}
      />

      <InputFieldController
        control={control}
        name="params.brand"
        label="Бренд"
        id="form-electronics-brand"
      />

      <InputFieldController
        control={control}
        name="params.model"
        label="Модель"
        id="form-electronics-model"
      />

      <SelectFieldController
        control={control}
        name="params.condition"
        label="Состояние"
        id="form-electronics-condition"
        placeholder="Выберите состояние"
        options={electronicsConditionMapper}
      />

      <InputFieldController
        control={control}
        name="params.color"
        label="Цвет"
        id="form-electronics-color"
      />
    </>
  )
}
