import { type Control } from "react-hook-form"
import { realEstateTypeMapper } from "@/lib/mappers"
import type { FormValues } from "./AdEditForm"
import { InputFieldController } from "./InputFieldController"
import { SelectFieldController } from "./SelectFieldController"

type Props = {
  control: Control<FormValues>
}

export function RealEstateParamsFields({ control }: Props) {
  return (
    <>
      <SelectFieldController
        control={control}
        name="params.type"
        label="Тип"
        id="form-real-estate-type"
        placeholder="Выберите тип недвижимости"
        options={realEstateTypeMapper}
      />

      <InputFieldController
        control={control}
        name="params.address"
        label="Адрес"
        id="form-real-estate-address"
      />

      <InputFieldController
        control={control}
        name="params.area"
        label="Площадь"
        id="form-real-estate-area"
        type="number"
      />

      <InputFieldController
        control={control}
        name="params.floor"
        label="Этаж"
        id="form-real-estate-floor"
        type="number"
      />
    </>
  )
}
