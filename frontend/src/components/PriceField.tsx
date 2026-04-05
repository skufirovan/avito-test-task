import { Sparkles } from "lucide-react"
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormSetValue,
} from "react-hook-form"
import { Button } from "@/components/ui/Button"
import { Field, FieldError, FieldLabel } from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"
import { useSuggestItemPricesMutation } from "@/store/api/itemsApi"
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert"
import { Typography } from "./ui/Typography"

type Props<T extends FieldValues> = {
  control: Control<T>
  setValue: UseFormSetValue<T>
  name: FieldPath<T>
  itemId: number
  id?: string
  label?: string
}

export function PriceField<T extends FieldValues>({
  control,
  setValue,
  name,
  itemId,
  id = "form-price",
  label = "Цена",
}: Props<T>) {
  const [suggestPrices, { data, isLoading, isError }] =
    useSuggestItemPricesMutation()

  const handleAnalyzePrice = async () => {
    await suggestPrices(itemId).unwrap()
  }

  const handleApplyPrice = (price: number) => {
    setValue(name, price as T[FieldPath<T>], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <FieldLabel htmlFor={id}>{label}</FieldLabel>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAnalyzePrice}
                disabled={isLoading}
              >
                <Sparkles className="mr-2 size-4" />
                {isLoading ? "Анализируем..." : "Анализ цены"}
              </Button>
            </div>

            <Input
              {...field}
              id={id}
              type="number"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value === "" ? "" : Number(value))
              }}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {isError && (
        <Alert className="mt-3">
          <AlertTitle>Не удалось получить рекомендации</AlertTitle>
          <AlertDescription>
            Попробуй запустить анализ ещё раз.
          </AlertDescription>
        </Alert>
      )}

      {data && (
        <Alert className="mt-3">
          <AlertTitle>Рекомендации по цене</AlertTitle>
          <AlertDescription className="space-y-4">
            <Typography variant="p">{data.summary}</Typography>

            <div className="space-y-2">
              {data.suggestions.map((suggestion) => (
                <div
                  key={suggestion.title}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="min-w-0">
                    <Typography variant="p" className="mb-0! font-medium">
                      {suggestion.title}
                    </Typography>
                    <Typography
                      variant="large"
                      className="text-sm text-primary"
                    >
                      {suggestion.price.toLocaleString("ru-RU")} ₽
                    </Typography>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleApplyPrice(suggestion.price)}
                  >
                    Применить
                  </Button>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
