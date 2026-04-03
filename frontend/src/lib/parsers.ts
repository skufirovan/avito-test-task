import type { Category, GetItemsParams } from "@/api/types"

export function parseSortColumn(
  value: string | null
): GetItemsParams["sortColumn"] {
  return value === "title" || value === "createdAt" ? value : undefined
}

export function parseSortDirection(
  value: string | null
): GetItemsParams["sortDirection"] {
  return value === "asc" || value === "desc" ? value : undefined
}

export function parsePage(value: string | null): number {
  const page = Number(value)

  if (!Number.isInteger(page) || page < 1) {
    return 1
  }

  return page
}

const isCategory = (value: unknown): value is Category =>
  value === "auto" || value === "real_estate" || value === "electronics"

export function parseCategories(value: string): Category[] {
  return value.split(",").filter(isCategory)
}
