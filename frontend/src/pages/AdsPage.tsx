import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import {
  FiltersSidebar,
  AdsPagination,
  ApiErrorState,
  ItemsList,
  SearchInput,
  SortDropdown,
  Typography,
} from "@/components"
import { useAdsSearchParams } from "@/hooks/useAdsSearchParams"
import { ADS_PER_PAGE } from "@/lib/constants"
import { useGetItemsQuery } from "@/store/api/itemsApi"

export function AdsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { browserParams, apiParams, normalizeUrl } = useAdsSearchParams()
  const { data, isLoading, isError, refetch } = useGetItemsQuery(apiParams)

  useEffect(() => {
    normalizeUrl()

    if (!data) return

    const totalPages = Math.max(1, Math.ceil(data.total / ADS_PER_PAGE))

    if (browserParams.page > totalPages) {
      const params = new URLSearchParams(searchParams)
      params.set("page", totalPages.toString())
      setSearchParams(params, { replace: true })
    }
  }, [normalizeUrl, browserParams.page, data, searchParams, setSearchParams])

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
    <div className="flex flex-col gap-4 px-6 py-8">
      <div className="mb-4 flex flex-col gap-3">
        <Typography variant="h1" className="cursor-default text-left">
          <Link to="/ads">Мои объявления</Link>
        </Typography>
        <div className="flex gap-2">
          <SearchInput total={data?.total} />
          <SortDropdown />
        </div>
      </div>

      <div className="flex gap-4">
        <FiltersSidebar />

        <div className="grow">
          <ItemsList items={data?.items} isLoading={isLoading} />
          {data?.total && data.total > ADS_PER_PAGE ? (
            <AdsPagination totalPages={Math.ceil(data.total / ADS_PER_PAGE)} />
          ) : undefined}
        </div>
      </div>
    </div>
  )
}

export default AdsPage
