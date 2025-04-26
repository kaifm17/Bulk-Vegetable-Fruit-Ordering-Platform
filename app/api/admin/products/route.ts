import { NextResponse } from "next/server"

import type { Product } from "@/types"

// Mock database
const products: Product[] = [
  { id: 1, name: "Apples", price: 120 },
  { id: 2, name: "Bananas", price: 60 },
  { id: 3, name: "Carrots", price: 40 },
  { id: 4, name: "Potatoes", price: 30 },
  { id: 5, name: "Tomatoes", price: 80 },
  { id: 6, name: "Onions", price: 35 },
  { id: 7, name: "Cucumbers", price: 45 },
  { id: 8, name: "Oranges", price: 100 },
]

export async function GET() {
  // In a real app, this would fetch from a database
  // and would include authentication checks
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new product
    const newProduct: Product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: body.name,
      price: Number.parseFloat(body.price),
    }

    // Save to database (mock)
    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
