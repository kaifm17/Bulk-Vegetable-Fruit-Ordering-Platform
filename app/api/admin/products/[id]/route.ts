import { NextResponse } from "next/server"

import type { Product } from "@/types"

// Mock database
let products: Product[] = [
  { id: 1, name: "Apples", price: 120 },
  { id: 2, name: "Bananas", price: 60 },
  { id: 3, name: "Carrots", price: 40 },
  { id: 4, name: "Potatoes", price: 30 },
  { id: 5, name: "Tomatoes", price: 80 },
  { id: 6, name: "Onions", price: 35 },
  { id: 7, name: "Cucumbers", price: 45 },
  { id: 8, name: "Oranges", price: 100 },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find product by ID
  const product = products.find((product) => product.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find and update product
    const productIndex = products.findIndex((product) => product.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: body.name,
      price: Number.parseFloat(body.price),
    }

    return NextResponse.json(products[productIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Find product by ID
    const productIndex = products.findIndex((product) => product.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Delete product
    const deletedProduct = products[productIndex]
    products = products.filter((product) => product.id !== id)

    return NextResponse.json(deletedProduct)
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
