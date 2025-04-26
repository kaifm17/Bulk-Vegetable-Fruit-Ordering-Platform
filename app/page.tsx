import { Suspense } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductList from "@/components/product-list"
import { ProductListSkeleton } from "@/components/skeletons"
import { SearchFilters } from "@/components/search-filters"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Fresh Produce, Wholesale Prices</h1>
            <p className="mb-6 text-lg">Quality fruits and vegetables delivered in bulk for your business needs</p>
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Link href="/order">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Place Bulk Order
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Available Products</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <SearchFilters />
            <Button asChild variant="outline">
              <Link href="/order">Place Order</Link>
            </Button>
          </div>
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  )
}
