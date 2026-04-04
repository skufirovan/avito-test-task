import { isCategory, type Category, type GetItemsParams } from "@/api/types"

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

export function parseCategories(value: string): Category[] {
  return value.split(",").filter(isCategory)
}
