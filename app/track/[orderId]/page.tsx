"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Clock, Truck } from "lucide-react"

import type { Order } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function OrderTrackingPage({
  params,
}: {
  params: { orderId: string }
}) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchOrder = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        if (params.orderId) {
          const mockOrder: Order = {
            id: params.orderId,
            productId: 1,
            productName: "Apples",
            quantity: 10,
            customerName: "John Doe",
            contact: "9876543210",
            email: "john@example.com",
            address: "123 Main St, City, State, 12345",
            status: Math.random() > 0.6 ? "Delivered" : Math.random() > 0.3 ? "In Progress" : "Pending",
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          }

          setOrder(mockOrder)
        } else {
          setError("Order not found")
        }
      } catch (err) {
        setError("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Skeleton className="h-8 w-1/2 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-6 text-3xl font-bold">Order Not Found</h1>
          <p className="mb-6 text-muted-foreground">We couldn't find an order with the ID: {params.orderId}</p>
          <Button asChild>
            <Link href="/track">Try Another Order ID</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-8 w-8 text-yellow-500" />
      case "In Progress":
        return <Truck className="h-8 w-8 text-blue-500" />
      case "Delivered":
        return <CheckCircle2 className="h-8 w-8 text-green-500" />
      default:
        return <Clock className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "Pending":
        return "Your order has been received and is awaiting processing."
      case "In Progress":
        return "Your order is being prepared and will be shipped soon."
      case "Delivered":
        return "Your order has been delivered successfully."
      default:
        return "Status unknown."
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Order Tracking</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
            <CardDescription>Placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className={getStatusColor(order.status)}>
              <div className="flex items-center gap-3">
                {getStatusIcon(order.status)}
                <div>
                  <AlertTitle>Status: {order.status}</AlertTitle>
                  <AlertDescription>{getStatusDescription(order.status)}</AlertDescription>
                </div>
              </div>
            </Alert>

            {order.status !== "Delivered" && order.estimatedDelivery && (
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Estimated Delivery</h3>
                <p>{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
              </div>
            )}

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Order Details</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Product</p>
                  <p className="font-medium">{order.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{order.quantity} kg</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Delivery Information</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{order.contact}</p>
                </div>
                {order.email && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{order.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{order.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
            {order.status !== "Delivered" && (
              <Button asChild variant="outline" className="w-full">
                <Link href={`/contact?orderId=${order.id}`}>Contact Support</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
