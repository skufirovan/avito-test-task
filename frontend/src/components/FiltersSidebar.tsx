import { useSearchParams } from "react-router-dom"
import type { Category } from "@/api/types"
import { categoryMapper } from "@/lib/mappers"
import { parseCategories } from "@/lib/parsers"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import { Checkbox } from "./ui/Checkbox"
import {
  FieldGroup,
  FieldLegend,
  FieldSet,
  Field,
  FieldSeparator,
  FieldLabel,
} from "./ui/Field"
import { Switch } from "./ui/Switch"

const CATEGORY_VALUES: Category[] = ["auto", "electronics", "real_estate"]

export function FiltersSidebar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const needsRevisionParam = searchParams.get("needsRevision")
  const categoriesParam = searchParams.get("categories")
  const selectedCategories = parseCategories(categoriesParam ?? "")

  const handleSwitchChange = (checked: boolean) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)

        if (checked) {
          newParams.set("needsRevision", "true")
        } else {
          newParams.delete("needsRevision")
        }

        newParams.delete("page")
        return newParams
      },
      { replace: true }
    )
  }

  const handleSetCategory = (checked: boolean, value: string) => {
    setSearchParams(
      (prev) => {
        const currentCategories = prev.get("categories")?.split(",") || []
        let newCategories: string[]

        if (checked) {
          newCategories = currentCategories.includes(value)
            ? currentCategories
            : [...currentCategories, value]
        } else {
          newCategories = currentCategories.filter((cat) => cat !== value)
        }

        const newParams = new URLSearchParams(prev)

        if (newCategories.length === 0) {
          newParams.delete("categories")
        } else {
          newParams.set("categories", newCategories.join(","))
        }

        newParams.delete("page")
        return newParams
      },
      { replace: true }
    )
  }

  const handleResetFilters = () => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)

        newParams.delete("needsRevision")
        newParams.delete("categories")
        newParams.delete("page")

        return newParams
      },
      { replace: true }
    )
  }

  return (
    <div className="w-55">
      <Card className="mb-4 h-fit pt-4">
        <CardContent className="px-4">
          <FieldSet>
            <FieldLegend className="cursor-default">Фильтры</FieldLegend>

            <FieldSet>
              <FieldLegend variant="label" className="cursor-default">
                Категории
              </FieldLegend>

              <FieldGroup className="gap-3">
                {CATEGORY_VALUES.map((value) => (
                  <Field key={value} orientation="horizontal">
                    <Checkbox
                      id={value}
                      className="cursor-pointer"
                      checked={selectedCategories.includes(value)}
                      onCheckedChange={(checked) =>
                        handleSetCategory(checked === true, value)
                      }
                    />
                    <FieldLabel htmlFor={value} className="cursor-pointer">
                      {categoryMapper[value]}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <Field orientation="horizontal" className="w-fit">
              <Switch
                id="needs-revision"
                className="cursor-pointer"
                checked={needsRevisionParam === "true"}
                onCheckedChange={handleSwitchChange}
              />
              <FieldLabel htmlFor="needs-revision" className="cursor-pointer">
                Только требующие доработок
              </FieldLabel>
            </Field>
          </FieldSet>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handleResetFilters}>
        Сбросить фильтры
      </Button>
    </div>
  )
}
