import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getResultsWord(count: number) {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "результат"
  }

  if (
    [2, 3, 4].includes(lastDigit) &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return "результата"
  }

  return "результатов"
}

export const generatePagination = (
  currentPage: number,
  totalPages: number
): ("..." | number)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}
