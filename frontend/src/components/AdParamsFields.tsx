import type { Control } from "react-hook-form"
import type { Category } from "@/api/types"
import type { FormValues } from "./AdEditForm"
import { AutoParamsFields } from "./AutoParamsFields"
import { ElectronicsParamsFields } from "./ElectronicsParamsFields"
import { RealEstateParamsFields } from "./RealEstateParamsFields"

type Props = {
  control: Control<FormValues>
  category: Category
}

export function AdParamsFields({ control, category }: Props) {
  switch (category) {
    case "auto": {
      return <AutoParamsFields control={control} />
    }

    case "real_estate": {
      return <RealEstateParamsFields control={control} />
    }

    case "electronics": {
      return <ElectronicsParamsFields control={control} />
    }

    default: {
      return
    }
  }
}
