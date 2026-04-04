import type { Category, ItemParamsByCategory } from "@/api/types"

export const ADS_PER_PAGE = 10

export const ITEM_CATEGORIES = {
  AUTO: "auto",
  REAL_ESTATE: "real_estate",
  ELECTRONICS: "electronics",
} as const satisfies Record<string, Category>

export const itemCategoryConfig = {
  auto: {
    fields: [
      { key: "brand", label: "Бренд" },
      { key: "model", label: "Модель" },
      { key: "yearOfManufacture", label: "Год выпуска" },
      { key: "transmission", label: "КПП" },
      { key: "mileage", label: "Пробег" },
      { key: "enginePower", label: "Мощность" },
    ] as const,
  },
  real_estate: {
    fields: [
      { key: "type", label: "Тип" },
      { key: "address", label: "Адрес" },
      { key: "area", label: "Площадь" },
      { key: "floor", label: "Этаж" },
    ] as const,
  },
  electronics: {
    fields: [
      { key: "type", label: "Тип" },
      { key: "brand", label: "Бренд" },
      { key: "model", label: "Модель" },
      { key: "condition", label: "Состояние" },
      { key: "color", label: "Цвет" },
    ] as const,
  },
} as const satisfies {
  [C in Category]: {
    fields: readonly {
      key: keyof ItemParamsByCategory[C]
      label: string
    }[]
  }
}
