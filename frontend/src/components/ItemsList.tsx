import type { ListItem } from "@/api/types"
import { CardItem } from "./CardItem"
import { CardItemSkeleton } from "./CardItemSkeleton"
import { Typography } from "./ui/Typography"

type Props = {
  items?: ListItem[]
  isLoading: boolean
}

export function ItemsList({ items, isLoading }: Props) {
  const className =
    "grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] justify-items-center gap-3"

  if (isLoading) {
    return (
      <div className={className}>
        {Array.from({ length: 6 }).map((_, index) => (
          <CardItemSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!items?.length)
    return <Typography variant="lead">Ничего не найдено</Typography>

  return (
    <div className={className}>
      {items.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
    </div>
  )
}
