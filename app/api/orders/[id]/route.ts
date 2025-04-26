import { NextResponse } from "next/server"

import type { Order } from "@/types"

// Mock database
const orders: Order[] = [
  {
    id: "abc123",
    productId: 1,
    productName: "Apples",
    quantity: 25,
    customerName: "John Doe",
    contact: "9876543210",
    address: "123 Main St, City, State, 12345",
    status: "Pending",
    createdAt: "2023-04-18T10:30:00Z",
  },
  {
    id: "def456",
    productId: 3,
    productName: "Carrots",
    quantity: 50,
    customerName: "Jane Smith",
    contact: "8765432109",
    address: "456 Oak St, City, State, 12345",
    status: "In Progress",
    createdAt: "2023-04-17T14:20:00Z",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find order by ID
  const order = orders.find((order) => order.id === id)

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json(order)
}
