import { z } from "zod"
import type { Category } from "@/api/types"

export const CATEGORIES_ENUM = {
  AUTO: "auto",
  REAL_ESTATE: "real_estate",
  ELECTRONICS: "electronics",
} as const satisfies Record<string, Category>

const autoTransmissionSchema = z.enum(["automatic", "manual"], {
  error: "Коробка передач должна быть автоматической или механической",
})

export const autoItemParamsSchema = z.strictObject({
  brand: z.string().trim().nonempty("Укажите марку автомобиля"),
  model: z.string().trim().nonempty("Укажите модель автомобиля"),
  yearOfManufacture: z
    .number()
    .int()
    .positive("Год выпуска должен быть положительным числом"),
  transmission: autoTransmissionSchema,
  mileage: z.number().positive("Пробег должен быть положительным числом"),
  enginePower: z
    .number()
    .int()
    .positive("Мощность двигателя должна быть положительным целым числом"),
})

const realEstateTypeSchema = z.enum(["flat", "house", "room"], {
  error: "Некорректный тип недвижимости",
})

export const realEstateItemParamsSchema = z.strictObject({
  type: realEstateTypeSchema,
  address: z.string().trim().nonempty("Укажите адрес"),
  area: z.number().positive("Площадь должна быть положительным числом"),
  floor: z
    .number()
    .int()
    .positive("Этаж должен быть положительным целым числом"),
})

const electronicsTypeSchema = z.enum(["phone", "laptop", "misc"], {
  error: "Некорректный тип устройства",
})
const electronicsConditionSchema = z.enum(["new", "used"], {
  error: "Состояние должно быть либо новым, либо БУ",
})

export const electronicsItemParamsSchema = z.strictObject({
  type: electronicsTypeSchema,
  brand: z.string().trim().nonempty("Укажите бренд"),
  model: z.string().trim().nonempty("Укажите модель"),
  condition: electronicsConditionSchema,
  color: z.string().trim().nonempty("Укажите цвет"),
})

const categorySchema = z.enum(Object.values(CATEGORIES_ENUM), {
  error: "Выберите категорию",
})

export const itemUpdateInSchema = z
  .object({
    category: categorySchema,
    title: z.string().trim().nonempty("Название обязательно"),
    description: z.string().optional(),
    price: z.number().min(0, "Цена не может быть отрицательной"),
  })
  .and(
    z.discriminatedUnion("category", [
      z.object({
        category: z.literal(CATEGORIES_ENUM.AUTO),
        params: autoItemParamsSchema.partial(),
      }),
      z.object({
        category: z.literal(CATEGORIES_ENUM.REAL_ESTATE),
        params: realEstateItemParamsSchema.partial(),
      }),
      z.object({
        category: z.literal(CATEGORIES_ENUM.ELECTRONICS),
        params: electronicsItemParamsSchema.partial(),
      }),
    ])
  )
