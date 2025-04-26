import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

import type { Order } from "@/types"

// Mock database
const orders: Order[] = []

export async function GET() {
  // In a real app, this would fetch from a database
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.productId || !body.quantity || !body.customerName || !body.contact || !body.address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new order
    const newOrder: Order = {
      id: uuidv4(),
      productId: Number.parseInt(body.productId),
      productName: "Product Name", // In a real app, get this from the product database
      quantity: Number.parseInt(body.quantity),
      customerName: body.customerName,
      contact: body.contact,
      address: body.address,
      status: "Pending",
      createdAt: new Date().toISOString(),
    }

    // Save to database (mock)
    orders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
