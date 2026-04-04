import { useSearchParams } from "react-router-dom"
import { Button } from "./ui/Button"
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
import { Card, CardContent } from "./ui/Сard"

export function FiltersSidebar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const needsRevisionParam = searchParams.get("needsRevision")
  const categoriesParam = searchParams.get("categories")
  const selectedCategories = categoriesParam ? categoriesParam.split(",") : []

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
                <Field orientation="horizontal">
                  <Checkbox
                    id="auto"
                    className="cursor-pointer"
                    checked={selectedCategories.includes("auto")}
                    onCheckedChange={(checked) =>
                      handleSetCategory(checked === true, "auto")
                    }
                  />
                  <FieldLabel htmlFor="auto" className="cursor-pointer">
                    Авто
                  </FieldLabel>
                </Field>

                <Field orientation="horizontal">
                  <Checkbox
                    id="electronics"
                    className="cursor-pointer"
                    checked={selectedCategories.includes("electronics")}
                    onCheckedChange={(checked) =>
                      handleSetCategory(checked === true, "electronics")
                    }
                  />
                  <FieldLabel htmlFor="electronics" className="cursor-pointer">
                    Электроника
                  </FieldLabel>
                </Field>

                <Field orientation="horizontal">
                  <Checkbox
                    id="real_estate"
                    className="cursor-pointer"
                    checked={selectedCategories.includes("real_estate")}
                    onCheckedChange={(checked) =>
                      handleSetCategory(checked === true, "real_estate")
                    }
                  />
                  <FieldLabel htmlFor="real_estate" className="cursor-pointer">
                    Недвижимость
                  </FieldLabel>
                </Field>
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
