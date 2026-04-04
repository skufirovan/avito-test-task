import { useParams } from "react-router-dom"
import { useGetItemByIdQuery } from "@/store/api/itemsApi"

export function useFetchAd() {
  const { id } = useParams<{ id: string }>()
  const itemId = Number(id)
  const isInvalidId = !Number.isInteger(itemId) || itemId < 1

  const query = useGetItemByIdQuery(itemId, {
    skip: isInvalidId,
  })

  return {
    itemId,
    isInvalidId,
    ...query,
  }
}
