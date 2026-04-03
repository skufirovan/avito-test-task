import { Search } from "lucide-react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { getResultsWord } from "@/lib/utils"
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/InputGroup"

type Props = {
  total?: number
  className?: string
}

export function SearchInput({ total }: Props) {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("q", term)
    } else {
      params.delete("q")
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true })
  }, 300)

  return (
    <InputGroup className="max-w-md">
      <InputGroupInput
        placeholder="Найти объявление..."
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {total ? (
        <InputGroupAddon align="inline-end">
          {total} {getResultsWord(total)}
        </InputGroupAddon>
      ) : undefined}
    </InputGroup>
  )
}
