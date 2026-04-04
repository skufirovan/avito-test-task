import { MoveLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import {
  ApiErrorState,
  Button,
  Typography,
  Spinner,
  AdOverview,
} from "@/components"
import { formatDate } from "@/lib/utils"
import { useGetItemByIdQuery } from "@/store/api/itemsApi"
import { NotFoundPage } from "./NotFoundPage"

export function AdPage() {
  const { id } = useParams<{ id: string }>()
  const itemId = Number(id)

  if (!Number.isInteger(itemId) || itemId < 1) {
    return <NotFoundPage />
  }

  const { data, isLoading, isError, refetch } = useGetItemByIdQuery(Number(id))

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
      <div className="flex justify-between">
        <Typography variant="h1" className="cursor-default text-3xl">
          {data.title}
        </Typography>
        <Typography variant="h2">{data.price.toLocaleString()} ₽</Typography>
      </div>

      <div className="mb-6 flex justify-between">
        <div className="flex gap-1">
          <Link to="/ads">
            <Button size="icon-lg">
              <MoveLeft />
            </Button>
          </Link>
          <Link to={`/ads/${data.id}/edit`}>
            <Button size="lg">Редактировать</Button>
          </Link>
        </div>

        <div className="flex flex-col items-end">
          <Typography variant="muted">
            Опубликовано: {formatDate(data.createdAt)}
          </Typography>
          <Typography variant="muted">
            Обновлено: {formatDate(data.updatedAt)}
          </Typography>
        </div>
      </div>

      <AdOverview item={data} />
    </div>
  )
}
