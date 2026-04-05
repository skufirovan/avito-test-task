import { AdEditForm, ApiErrorState, Spinner, Typography } from "@/components"
import { Separator } from "@/components/ui/Separator"
import { useFetchAd } from "@/hooks/useFetchAd"
import { NotFoundPage } from "./NotFoundPage"

export function AdEditPage() {
  const { data, isLoading, isError, refetch, isInvalidId } = useFetchAd()

  if (isInvalidId) {
    return <NotFoundPage />
  }

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (isError) {
    return (
      <ApiErrorState
        title="Не удалось загрузить объявление"
        description="Попробуй обновить данные еще раз"
        onRetry={refetch}
      />
    )
  }

  if (!data) return

  return (
    <div className="px-6 pb-8">
      <div className="sticky top-0 z-999 mb-4 w-fit bg-background">
        <Typography
          variant="h1"
          className="cursor-default pt-8 pb-2 text-left text-3xl"
        >
          Редактирование объявления
        </Typography>
        <Separator />
      </div>

      <AdEditForm item={data} />
    </div>
  )
}
