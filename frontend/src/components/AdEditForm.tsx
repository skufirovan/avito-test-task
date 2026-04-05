import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import type { Item } from "@/api/types"
import { categoryMapper } from "@/lib/mappers"
import { getItemFormDefaultValues } from "@/lib/utils"
import { itemUpdateInSchema } from "@/lib/validation"
import { useUpdateItemMutation } from "@/store/api/itemsApi"
import { AdParamsFields } from "./AdParamsFields"
import { DescriptionField } from "./DescriptionField"
import { PriceField } from "./PriceField"
import { Button } from "./ui/Button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/Field"
import { Input } from "./ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select"

export type FormValues = z.infer<typeof itemUpdateInSchema>

type Props = {
  item: Item
}

export function AdEditForm({ item }: Props) {
  const [update, { isLoading }] = useUpdateItemMutation()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(itemUpdateInSchema),
    defaultValues: getItemFormDefaultValues(item),
  })

  const category = useWatch({
    control: form.control,
    name: "category",
  })

  const handleSubmit = async (data: FormValues) => {
    try {
      await update({ id: item.id, data }).unwrap()
      navigate(`/ads/${item.id}`, { replace: true })
    } catch {
      form.setError("root", {
        message: "Не удалось сохранить изменения",
      })
    }
  }

  return (
    <form
      id="ad-edit-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-100"
      noValidate
    >
      <FieldGroup>
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-category">Категория</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="form-category"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>

                <SelectContent position="item-aligned">
                  {Object.entries(categoryMapper).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-title">Название</FieldLabel>
              <Input
                {...field}
                id="form-title"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <PriceField
          control={form.control}
          setValue={form.setValue}
          name="price"
          itemId={item.id}
        />

        <AdParamsFields control={form.control} category={category} />

        <DescriptionField
          control={form.control}
          setValue={form.setValue}
          name="description"
          itemId={item.id}
        />

        <Field orientation="horizontal" className="gap-3">
          <FieldError errors={[form.formState.errors.root]} />
          <Button
            asChild
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            <Link to={`/ads/${item.id}`}>Отменить</Link>
          </Button>
          <Button type="submit" form="ad-edit-form" disabled={isLoading}>
            Сохранить
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
