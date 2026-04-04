import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod"
import type { Item } from "@/api/types"
import { itemCategoryConfig } from "./constants"
import type { itemUpdateInSchema } from "./validation"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getResultsWord(count: number, word?: string) {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return word ?? "результат"
  }

  if (
    [2, 3, 4].includes(lastDigit) &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return word ? word + "а" : "результата"
  }

  return word ? word + "ов" : "результатов"
}

export const generatePagination = (
  currentPage: number,
  totalPages: number
): ("..." | number)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function formatDate(value: string) {
  const date = new Date(value)
  return date.toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function getMissingFields(item: Item) {
  const config = itemCategoryConfig[item.category]

  return config.fields.filter((field) => {
    const params = item.params
    const value = params[field.key as keyof typeof params]
    return value === undefined || value === null || value === ""
  })
}

export function getItemFormDefaultValues(
  item: Item
): z.infer<typeof itemUpdateInSchema> {
  return {
    category: item.category,
    title: item.title,
    price: item.price,
    description: item.description ?? "",
    params: item.params,
  } as z.infer<typeof itemUpdateInSchema>
}
