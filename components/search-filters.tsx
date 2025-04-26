"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [priceRange, setPriceRange] = useState([
    searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : 0,
    searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : 200,
  ])
  const [isOpen, setIsOpen] = useState(false)

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (search) {
      params.set("search", search)
    } else {
      params.delete("search")
    }

    router.push(`/?${params.toString()}`)
  }

  // Apply price filter
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (search) {
      params.set("search", search)
    }

    router.push(`/?${params.toString()}`)
    setIsOpen(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearch("")
    setPriceRange([0, 200])
    router.push("/")
    setIsOpen(false)
  }

  return (
    <div className="flex w-full gap-2 sm:w-auto">
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription>Adjust the filters to find exactly what you're looking for.</SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <Label htmlFor="price-range">Price Range (₹)</Label>
              <Slider id="price-range" min={0} max={200} step={5} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
