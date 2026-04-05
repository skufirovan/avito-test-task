import { MoveLeft } from "lucide-react"
import { Link } from "react-router-dom"
import {
  ApiErrorState,
  Button,
  Typography,
  Spinner,
  AdOverview,
} from "@/components"
import { useFetchAd } from "@/hooks/useFetchAd"
import { formatDate } from "@/lib/utils"
import { NotFoundPage } from "./NotFoundPage"

export function AdPage() {
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
      <div className="flex justify-between">
        <Typography variant="h1" className="cursor-default text-left text-3xl">
          {data.title}
        </Typography>
        <Typography variant="h2" className="min-w-max">
          {data.price.toLocaleString()} ₽
        </Typography>
      </div>

      <div className="mb-6 flex justify-between">
        <div className="flex gap-1">
          <Button asChild size="icon-lg">
            <Link to="/ads">
              <MoveLeft />
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link to={`/ads/${data.id}/edit`}>Редактировать</Link>
          </Button>
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
