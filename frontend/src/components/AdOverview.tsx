import type { Item } from "@/api/types"
import { ItemParams } from "./ItemParams"
import { AspectRatio } from "./ui/AspectRatio"
import { Typography } from "./ui/Typography"

type Props = {
  item: Item
}

export function AdOverview({ item }: Props) {
  return (
    <div>
      <div className="mb-4 flex gap-6">
        <div className="w-100">
          <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted" />
        </div>

        <div>
          <Typography variant="h3" className="mb-2">
            Характеристики
          </Typography>
          <ItemParams category={item.category} params={item.params} />
        </div>
      </div>

      {item.description && (
        <div>
          <Typography variant="h3" className="mb-2">
            Описание
          </Typography>
          <Typography variant="p" className="w-xl break-all">
            {item.description}
          </Typography>
        </div>
      )}
    </div>
  )
}
