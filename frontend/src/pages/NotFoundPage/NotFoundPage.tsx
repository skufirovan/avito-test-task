import { Link } from "react-router-dom"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/Empty"

export function NotFoundPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          Страница, которую вы ищете, не найдена
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          <Link to="/ads">Вернуться на главную</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
