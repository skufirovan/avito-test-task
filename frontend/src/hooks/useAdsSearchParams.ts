import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { GetItemsParams } from "@/api/types"
import { ADS_PER_PAGE } from "@/lib/constants"
import {
  parseCategories,
  parsePage,
  parseSortColumn,
  parseSortDirection,
} from "../lib/parsers"

type AdsBrowserParams = {
  q?: GetItemsParams["q"]
  page: number
  needsRevision?: GetItemsParams["needsRevision"]
  categories?: GetItemsParams["categories"]
  sortColumn?: GetItemsParams["sortColumn"]
  sortDirection?: GetItemsParams["sortDirection"]
}

type UseAdsSearchParamsResult = {
  browserParams: AdsBrowserParams
  apiParams: GetItemsParams
  normalizeUrl: () => void
}

export function useAdsSearchParams(): UseAdsSearchParamsResult {
  const [searchParams, setSearchParams] = useSearchParams()

  const browserParams = useMemo<AdsBrowserParams>(() => {
    const q = searchParams.get("q")?.trim() || undefined
    const page = parsePage(searchParams.get("page"))
    const needsRevision =
      searchParams.get("needsRevision") === "true" ? true : undefined
    const categories = parseCategories(searchParams.get("categories") ?? "")
    const sortColumn = parseSortColumn(searchParams.get("sortColumn"))
    const sortDirection = parseSortDirection(searchParams.get("sortDirection"))

    return {
      q,
      page,
      needsRevision,
      categories: categories.length > 0 ? categories : undefined,
      sortColumn,
      sortDirection,
    }
  }, [searchParams])

  const apiParams = useMemo<GetItemsParams>(
    () => ({
      q: browserParams.q,
      limit: ADS_PER_PAGE,
      skip: (browserParams.page - 1) * ADS_PER_PAGE,
      needsRevision: browserParams.needsRevision,
      categories: browserParams.categories,
      sortColumn: browserParams.sortColumn,
      sortDirection: browserParams.sortDirection,
    }),
    [browserParams]
  )

  const normalizeUrl = useCallback(() => {
    const normalized = new URLSearchParams()

    if (browserParams.q) normalized.set("q", browserParams.q)
    if (browserParams.page > 1)
      normalized.set("page", String(browserParams.page))
    if (browserParams.needsRevision) normalized.set("needsRevision", "true")
    if (browserParams.categories?.length) {
      normalized.set("categories", browserParams.categories.join(","))
    }
    if (browserParams.sortColumn) {
      normalized.set("sortColumn", browserParams.sortColumn)
    }
    if (browserParams.sortDirection) {
      normalized.set("sortDirection", browserParams.sortDirection)
    }

    if (normalized.toString() !== searchParams.toString()) {
      setSearchParams(normalized, { replace: true })
    }
  }, [browserParams, searchParams, setSearchParams])

  return {
    browserParams,
    apiParams,
    normalizeUrl,
  }
}
