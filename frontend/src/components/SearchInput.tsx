import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { pluralizeRu } from "@/lib/utils"
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/InputGroup"

type Props = {
  total?: number
  className?: string
}

export function SearchInput({ total }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(() => searchParams.get("q") || "")

  useEffect(() => {
    const q = searchParams.get("q") || ""
    setValue(q)
  }, [searchParams])

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("q", term)
    } else {
      params.delete("q")
    }
    params.delete("page")
    setSearchParams(params, { replace: true })
  }, 300)

  return (
    <InputGroup className="max-w-md">
      <InputGroupInput
        placeholder="Найти объявление..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {total ? (
        <InputGroupAddon align="inline-end">
          {total}{" "}
          {pluralizeRu(total, {
            one: "результат",
            few: "результата",
            many: "результатов",
          })}
        </InputGroupAddon>
      ) : undefined}
    </InputGroup>
  )
}
