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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/InputGroup"
import { pluralizeRu } from "@/lib/utils"
import { useGenerateItemDescriptionMutation } from "@/store/api/itemsApi"

type Props<T extends FieldValues> = {
  control: Control<T>
  setValue: UseFormSetValue<T>
  name: FieldPath<T>
  itemId: number
  id?: string
  label?: string
}

export function DescriptionField<T extends FieldValues>({
  control,
  setValue,
  name,
  itemId,
  id = "form-description",
  label = "Описание",
}: Props<T>) {
  const [generateDescription, { isLoading }] =
    useGenerateItemDescriptionMutation()

  const handleGenerateDescription = async () => {
    const result = await generateDescription(itemId).unwrap()
    const cleanDescription = result.suggestedDescription
      .replace(/^["'«»“”‘’]|["'«»“”‘’]$/g, "")
      .replace(/\\["']/g, '"')
      .trim()

    setValue(name, cleanDescription as T[FieldPath<T>], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value = typeof field.value === "string" ? field.value : ""
        const length = value.length

        return (
          <Field data-invalid={fieldState.invalid}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <FieldLabel htmlFor={id}>{label}</FieldLabel>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateDescription}
                disabled={isLoading}
              >
                <Sparkles className="mr-2 size-4" />
                {isLoading ? "Генерируем..." : "Придумать описание"}
              </Button>
            </div>

            <InputGroup>
              <InputGroupTextarea
                {...field}
                id={id}
                value={value}
                rows={6}
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
              />

              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {length}{" "}
                  {pluralizeRu(length, {
                    one: "символ",
                    few: "символа",
                    many: "символов",
                  })}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
