import { ApiErrorState, ItemsList } from "@/components"
import { Typography } from "@/components/ui/Typography"
import { useGetItemsQuery } from "@/store/api/itemsApi"

export function AdsPage() {
  const { data, isLoading, isError, refetch } = useGetItemsQuery()

  if (isError) {
    return (
      <ApiErrorState
        title="Не удалось загрузить объявления"
        description="Попробуй обновить данные еще раз"
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="px-6 py-8">
      <Typography variant="h1" className="text-left">
        Мои объявления
      </Typography>
      <Typography variant="muted" className="mb-4 text-xl">
        Найдено объявлений: {data?.total}
      </Typography>

      <ItemsList items={data?.items} isLoading={isLoading} />
    </div>
  )
}

export default AdsPage
