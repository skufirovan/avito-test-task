import type { Item } from "@/api/types"
import { getMissingFields } from "@/lib/utils"
import { ItemParams } from "./ItemParams"
import { MissingFieldsWarning } from "./MissingFieldsWarning"
import { AspectRatio } from "./ui/AspectRatio"
import { Typography } from "./ui/Typography"

type Props = {
  item: Item
}

export function AdOverview({ item }: Props) {
  const missing = getMissingFields(item)

  return (
    <div>
      <div className="mb-4 flex gap-6">
        <div className="w-100">
          <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted" />
        </div>

        <div className="flex gap-8">
          <div>
            <Typography variant="h3" className="mb-2">
              Характеристики
            </Typography>
            <ItemParams category={item.category} params={item.params} />
          </div>

          <MissingFieldsWarning missingFields={missing} />
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
