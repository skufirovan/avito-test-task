import type {
  Category,
  ElectronicsCondition,
  ElectronicsType,
  RealEstateType,
  Transmission,
} from "@/api/types"

export const categoryMapper: Record<Category, string> = {
  auto: "Авто",
  real_estate: "Недвижимость",
  electronics: "Электроника",
}

export const transmissionMapper: Record<Transmission, string> = {
  automatic: "Автоматическая",
  manual: "Механическая",
}

export const realEstateTypeMapper: Record<RealEstateType, string> = {
  flat: "Квартира",
  house: "Дом",
  room: "Комната",
}

export const electronicsTypeMapper: Record<ElectronicsType, string> = {
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Разное",
}

export const electronicsConditionMapper: Record<ElectronicsCondition, string> =
  {
    new: "Новое",
    used: "БУ",
  }
