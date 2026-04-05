import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./ui/Pagination"

type Props = {
  page: number | "..."
  href: string
  isActive: boolean
  isEllipsis?: boolean
}

export function AdsPaginationNumber({
  page,
  href,
  isActive,
  isEllipsis,
}: Props) {
  if (isEllipsis) {
    return (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    )
  }

  return (
    <PaginationItem>
      <PaginationLink to={href} isActive={isActive}>
        {page}
      </PaginationLink>
    </PaginationItem>
  )
}
