export type Category = "auto" | "real_estate" | "electronics"

export interface AutoItemParams {
  brand?: string
  model?: string
  yearOfManufacture?: number
  transmission?: "automatic" | "manual"
  mileage?: number
  enginePower?: number
}

export interface RealEstateItemParams {
  type?: "flat" | "house" | "room"
  address?: string
  area?: number
  floor?: number
}

export interface ElectronicsItemParams {
  type?: "phone" | "laptop" | "misc"
  brand?: string
  model?: string
  condition?: "new" | "used"
  color?: string
}

export interface Item {
  id: number
  category: Category
  title: string
  description?: string
  price: number
  createdAt: string
  updatedAt: string
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams
}

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
