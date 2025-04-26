"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderId.trim()) {
      toast({
        title: "Order ID required",
        description: "Please enter an order ID to track your order.",
        variant: "destructive",
      })
      return
    }

    router.push(`/track/${orderId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-center">Track Your Order</h1>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="orderId"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Order ID
              </label>
              <Input
                id="orderId"
                placeholder="Enter your order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Track Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
