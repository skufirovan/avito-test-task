import { Info } from "lucide-react"
import type { ListItem } from "@/api/types"
import { categoryMapper } from "@/lib/mappers"
import { Badge } from "./ui/Badge"
import { Item, ItemMedia, ItemContent, ItemTitle } from "./ui/Item"
import {
  Card,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/Сard"

type Props = {
  item: ListItem
}

export function CardItem({ item }: Props) {
  return (
    <Card className="relative w-xs pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <div className="relative z-20 aspect-video w-full bg-gray-300 brightness-60 grayscale dark:bg-gray-600 dark:brightness-40" />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{categoryMapper[item.category]}</Badge>
        </CardAction>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.price} ₽</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        {item.needsRevision && (
          <Item variant="outline" size="xs" className="w-fit">
            <ItemMedia variant="icon">
              <Info />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Требует правок</ItemTitle>
            </ItemContent>
          </Item>
        )}
      </CardFooter>
    </Card>
  )
}
