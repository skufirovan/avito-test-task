import { useSearchParams } from "react-router-dom"
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
  const [searchParams, setSearchParams] = useSearchParams()

  const currentSortColumn = searchParams.get(
    "sortColumn"
  ) as GetItemsParams["sortColumn"]
  const currentSortDirection = searchParams.get(
    "sortDirection"
  ) as GetItemsParams["sortDirection"]

  const currentValue =
    options.find(
      (opt) =>
        opt.sortColumn === currentSortColumn &&
        opt.sortDirection === currentSortDirection
    ) || null

  const onValueChange = (value: Option | null) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)

        if (value) {
          params.set("sortColumn", value.sortColumn)
          params.set("sortDirection", value.sortDirection)
        } else {
          params.delete("sortColumn")
          params.delete("sortDirection")
        }

        params.delete("page")
        return params
      },
      { replace: true }
    )
  }

  return (
    <Combobox
      items={options}
      onValueChange={onValueChange}
      defaultValue={currentValue}
    >
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
