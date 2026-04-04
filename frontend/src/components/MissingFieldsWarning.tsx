import { ShieldAlertIcon } from "lucide-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/Item"
import { Typography } from "./ui/Typography"

type Props = {
  missingFields: { key: string; label: string }[]
}

export function MissingFieldsWarning({ missingFields }: Props) {
  if (missingFields.length === 0) return

  return (
    <Item variant="outline" className="h-fit w-70 gap-2">
      <ItemMedia variant="icon">
        <ShieldAlertIcon />
      </ItemMedia>
      <ItemContent className="gap-0">
        <ItemTitle>Требуются доработки</ItemTitle>
        <ItemDescription>У объявления не заполнены поля:</ItemDescription>
        <Typography variant="ul">
          {missingFields.map((field) => (
            <li key={field.key} className="mt-0 text-muted-foreground">
              {field.label}
            </li>
          ))}
        </Typography>
      </ItemContent>
    </Item>
  )
}
