"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show limited page numbers with ellipsis for large page counts
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), "...", totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", ...pages.slice(totalPages - 5)]
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {visiblePages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2">
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page as number)}
            className="h-8 w-8"
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}

export const PaginationContent = () => null
export const PaginationItem = () => null
export const PaginationLink = () => null
export const PaginationEllipsis = () => null
export const PaginationPrevious = () => null
export const PaginationNext = () => null
