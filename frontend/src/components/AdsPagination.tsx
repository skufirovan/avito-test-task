import { useLocation, useSearchParams } from "react-router-dom"
import { parsePage } from "@/lib/parsers"
import { generatePagination } from "@/lib/utils"
import { AdsPaginationNumber } from "./AdsPaginationNumber"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/Pagination"

type Props = {
  totalPages: number
}

export function AdsPagination({ totalPages }: Props) {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const currentPage = parsePage(searchParams.get("page"))

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${location.pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              text="Назад"
            />
          </PaginationItem>
        )}

        {allPages.map((page, index) => {
          return (
            <AdsPaginationNumber
              key={`${page}-${index}`}
              href={typeof page === "number" ? createPageURL(page) : ""}
              page={page}
              isEllipsis={page === "..."}
              isActive={currentPage === page}
            />
          )
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              text="Далее"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
