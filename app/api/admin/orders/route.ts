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
  {
    id: "ghi789",
    productId: 5,
    productName: "Tomatoes",
    quantity: 30,
    customerName: "Bob Johnson",
    contact: "7654321098",
    address: "789 Pine St, City, State, 12345",
    status: "Delivered",
    createdAt: "2023-04-16T09:15:00Z",
  },
]

export async function GET() {
  // In a real app, this would fetch from a database
  // and would include authentication checks
  return NextResponse.json(orders)
}
