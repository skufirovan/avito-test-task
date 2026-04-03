import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import type { GetItemsParams } from "@/api/types"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "./ui/Combobox"

type Option = {
  sortColumn: NonNullable<GetItemsParams["sortColumn"]>
  sortDirection: NonNullable<GetItemsParams["sortDirection"]>
  label: string
}

const options: Option[] = [
  { sortColumn: "title", sortDirection: "asc", label: "По алфавиту" },
  { sortColumn: "createdAt", sortDirection: "asc", label: "Сначала старые" },
  { sortColumn: "createdAt", sortDirection: "desc", label: "Сначала новые" },
]

export function SortDropdown() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const onValueChange = (value: Option | null) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("sortColumn", value.sortColumn)
      params.set("sortDirection", value.sortDirection)
    } else if (!value) {
      params.delete("sortColumn")
      params.delete("sortDirection")
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true })
  }

  return (
    <Combobox items={options} onValueChange={onValueChange}>
      <ComboboxInput placeholder="Сортировать по" className="w-45" />
      <ComboboxContent>
        <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
        <ComboboxList>
          {(item: Option) => (
            <ComboboxItem key={item.label} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
