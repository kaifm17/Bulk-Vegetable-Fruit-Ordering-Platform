export interface Product {
  id: number
  name: string
  price: number
}

export interface Order {
  id: string
  productId: number
  productName: string
  quantity: number
  customerName: string
  contact: string
  email?: string
  address: string
  status: "Pending" | "In Progress" | "Delivered"
  createdAt: string
  estimatedDelivery?: string
}

export interface User {
  id: string
  name: string
  role: string
}
