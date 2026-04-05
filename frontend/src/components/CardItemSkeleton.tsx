import { Card, CardHeader } from "./ui/Card"
import { Skeleton } from "./ui/Skeleton"

export function CardItemSkeleton() {
  return (
    <Card className="relative w-xs pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <div className="relative z-20 aspect-video w-full bg-gray-300 brightness-60 grayscale dark:bg-gray-600 dark:brightness-40" />
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  )
}
