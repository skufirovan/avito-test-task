export type Category = "auto" | "real_estate" | "electronics"
export type Transmission = "automatic" | "manual"
export type RealEstateType = "flat" | "house" | "room"
export type ElectronicsType = "phone" | "laptop" | "misc"
export type ElectronicsCondition = "new" | "used"

export interface AutoItemParams {
  brand?: string
  model?: string
  yearOfManufacture?: number
  transmission?: Transmission
  mileage?: number
  enginePower?: number
}

export interface RealEstateItemParams {
  type?: RealEstateType
  address?: string
  area?: number
  floor?: number
}

export interface ElectronicsItemParams {
  type?: ElectronicsType
  brand?: string
  model?: string
  condition?: ElectronicsCondition
  color?: string
}

export type ItemParamsByCategory = {
  auto: AutoItemParams
  real_estate: RealEstateItemParams
  electronics: ElectronicsItemParams
}

export type Item = {
  id: number
  title: string
  description?: string
  price: number
  createdAt: string
  updatedAt: string
} & (
  | {
      category: "auto"
      params: AutoItemParams
    }
  | {
      category: "real_estate"
      params: RealEstateItemParams
    }
  | {
      category: "electronics"
      params: ElectronicsItemParams
    }
)

export interface ListItem {
  id: number
  category: Category
  title: string
  price: number
  needsRevision: boolean
}

export interface GetItemsResponse {
  items: ListItem[]
  total: number
}

export interface ItemUpdateIn {
  category: Category
  title: string
  description?: string
  price: number
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams
}

export interface GetItemsParams {
  q?: string
  limit?: number
  skip?: number
  needsRevision?: boolean
  categories?: Category[]
  sortColumn?: "title" | "createdAt"
  sortDirection?: "asc" | "desc"
}

export type GenerateDescriptionResponse = {
  suggestedDescription: string
}

export type PriceSuggestion = {
  title: string
  price: number
}

export type SuggestPricesResponse = {
  summary: string
  suggestions: [PriceSuggestion, PriceSuggestion, PriceSuggestion]
}

export const isCategory = (value: unknown): value is Category =>
  value === "auto" || value === "real_estate" || value === "electronics"

export const isAutoParams = (
  params: unknown,
  category: Category
): params is AutoItemParams =>
  category === "auto" && params !== null && typeof params === "object"

export const isRealEstateParams = (
  params: unknown,
  category: Category
): params is RealEstateItemParams =>
  category === "real_estate" && params !== null && typeof params === "object"

export const isElectronicsParams = (
  params: unknown,
  category: Category
): params is ElectronicsItemParams =>
  category === "electronics" && params !== null && typeof params === "object"
