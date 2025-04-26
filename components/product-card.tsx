import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Product } from "@/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="aspect-square w-full bg-green-100 flex items-center justify-center">
          <img
            src={`/placeholder.svg?height=200&width=200&text=${product.name}`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <p className="mt-2 text-2xl font-bold text-green-600">₹{product.price}/kg</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/order?product=${product.id}`}>
            Order Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
