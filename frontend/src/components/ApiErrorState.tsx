import { Button } from "./ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "./ui/Empty"

type Props = {
  title: string
  description: string
  onRetry: () => void
}

export function ApiErrorState({ title, description, onRetry }: Props) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onRetry}>Попробовать снова</Button>
      </EmptyContent>
    </Empty>
  )
}
