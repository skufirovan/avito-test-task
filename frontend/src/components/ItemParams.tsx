import {
  isAutoParams,
  isElectronicsParams,
  isRealEstateParams,
  type AutoItemParams,
  type Category,
  type ElectronicsItemParams,
  type RealEstateItemParams,
} from "@/api/types"
import {
  electronicsConditionMapper,
  electronicsTypeMapper,
  realEstateTypeMapper,
  transmissionMapper,
} from "@/lib/mappers"
import { ParamRow } from "./ParamRow"

type Props = {
  category: Category
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams
}

export function ItemParams({ category, params }: Props) {
  if (Object.keys(params).length === 0) {
    return <div>Не указаны</div>
  }

  if (isAutoParams(params, category)) {
    return (
      <div className="space-y-2">
        {params.brand && <ParamRow label="Бренд" value={params.brand} />}
        {params.model && <ParamRow label="Модель" value={params.model} />}
        {params.yearOfManufacture && (
          <ParamRow label="Год" value={params.yearOfManufacture} />
        )}
        {params.transmission && (
          <ParamRow
            label="КПП"
            value={transmissionMapper[params.transmission]}
          />
        )}
        {params.mileage !== undefined && (
          <ParamRow
            label="Пробег"
            value={`${params.mileage.toLocaleString()} км`}
          />
        )}
        {params.enginePower && (
          <ParamRow label="Мощность" value={`${params.enginePower} л.с.`} />
        )}
      </div>
    )
  }

  if (isRealEstateParams(params, category)) {
    return (
      <div className="space-y-2">
        {params.type && (
          <ParamRow label="Тип" value={realEstateTypeMapper[params.type]} />
        )}
        {params.address && <ParamRow label="Адрес" value={params.address} />}
        {params.area && (
          <ParamRow label="Площадь" value={`${params.area} м²`} />
        )}
        {params.floor !== undefined && (
          <ParamRow label="Этаж" value={params.floor} />
        )}
      </div>
    )
  }

  if (isElectronicsParams(params, category)) {
    return (
      <div className="space-y-2">
        {params.type && (
          <ParamRow label="Тип" value={electronicsTypeMapper[params.type]} />
        )}
        {params.brand && <ParamRow label="Бренд" value={params.brand} />}
        {params.model && <ParamRow label="Модель" value={params.model} />}
        {params.condition && (
          <ParamRow
            label="Состояние"
            value={electronicsConditionMapper[params.condition]}
          />
        )}
        {params.color && <ParamRow label="Цвет" value={params.color} />}
      </div>
    )
  }

  return <div>Нет параметров</div>
}
