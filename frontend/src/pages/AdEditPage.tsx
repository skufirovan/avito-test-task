import { AdEditForm, ApiErrorState, Spinner, Typography } from "@/components"
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
    <div className="px-6 py-8">
      <Typography
        variant="h1"
        className="mb-4 cursor-default text-left text-3xl"
      >
        Редактирование объявления
      </Typography>
      <AdEditForm item={data} />
    </div>
  )
}
