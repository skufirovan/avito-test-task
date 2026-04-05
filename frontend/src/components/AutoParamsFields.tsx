import type { Control } from "react-hook-form"
import { transmissionMapper } from "@/lib/mappers"
import type { FormValues } from "./AdEditForm"
import { InputFieldController } from "./InputFieldController"
import { SelectFieldController } from "./SelectFieldController"

type Props = {
  control: Control<FormValues>
}

export function AutoParamsFields({ control }: Props) {
  return (
    <>
      <InputFieldController
        control={control}
        name="params.brand"
        label="Бренд"
        id="form-auto-brand"
      />

      <InputFieldController
        control={control}
        name="params.model"
        label="Модель"
        id="form-auto-model"
      />

      <InputFieldController
        control={control}
        name="params.yearOfManufacture"
        label="Год выпуска"
        id="form-auto-year"
        type="number"
      />

      <SelectFieldController
        control={control}
        name="params.transmission"
        label="КПП"
        id="form-auto-transmission"
        placeholder="Выберите тип КПП"
        options={transmissionMapper}
      />

      <InputFieldController
        control={control}
        name="params.mileage"
        label="Пробег"
        id="form-auto-mileage"
        type="number"
      />

      <InputFieldController
        control={control}
        name="params.enginePower"
        label="Мощность"
        id="form-auto-engine-power"
        type="number"
      />
    </>
  )
}
