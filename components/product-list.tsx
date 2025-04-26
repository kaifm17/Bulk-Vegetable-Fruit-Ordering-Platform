"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { Product } from "@/types"
import { ProductCard } from "@/components/product-card"
import { Pagination } from "@/components/ui/pagination"
import { EmptyState } from "@/components/empty-state"

export default function ProductList() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const searchQuery = searchParams.get("search") || ""
  const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : 0
  const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : 1000

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would fetch from your API
        // const response = await fetch("/api/products")
        // const data = await response.json()

        // Mock data for now
        const data = [
          { id: 1, name: "Apples", price: 120 },
          { id: 2, name: "Bananas", price: 60 },
          { id: 3, name: "Carrots", price: 40 },
          { id: 4, name: "Potatoes", price: 30 },
          { id: 5, name: "Tomatoes", price: 80 },
          { id: 6, name: "Onions", price: 35 },
          { id: 7, name: "Cucumbers", price: 45 },
          { id: 8, name: "Oranges", price: 100 },
          { id: 9, name: "Grapes", price: 150 },
          { id: 10, name: "Watermelon", price: 90 },
          { id: 11, name: "Cabbage", price: 50 },
          { id: 12, name: "Bell Peppers", price: 70 },
        ]

        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    // Filter products based on search and price range
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice
      return matchesSearch && matchesPrice
    })

    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchQuery, minPrice, maxPrice])

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  if (loading) {
    return <p>Loading products...</p>
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState title="No products found" description="Try adjusting your search or filter criteria." icon="search" />
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
