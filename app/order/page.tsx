"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const products = [
  { id: 1, name: "Apples", price: 120 },
  { id: 2, name: "Bananas", price: 60 },
  { id: 3, name: "Carrots", price: 40 },
  { id: 4, name: "Potatoes", price: 30 },
  { id: 5, name: "Tomatoes", price: 80 },
  { id: 6, name: "Onions", price: 35 },
  { id: 7, name: "Cucumbers", price: 45 },
  { id: 8, name: "Oranges", price: 100 },
  { id: 9, name: "Grapes", price: 150 },
  { id: 10, name: "Watermelon", price: 90 },
  { id: 11, name: "Cabbage", price: 50 },
  { id: 12, name: "Bell Peppers", price: 70 },
]

const formSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  quantity: z.string().min(1, "Please enter a quantity"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().min(10, "Contact must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
})

export default function OrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const preselectedProduct = searchParams.get("product")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: preselectedProduct || "",
      quantity: "1",
      customerName: "",
      contact: "",
      address: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   body: JSON.stringify(values),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random order ID
      const orderId = Math.random().toString(36).substring(2, 10)

      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and is being processed.",
      })

      // Redirect to order tracking page
      router.push(`/track/${orderId}`)
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your order could not be placed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedProductId = Number.parseInt(form.watch("productId") || "0")
  const selectedProduct = products.find((p) => p.id === selectedProductId)
  const quantity = Number.parseInt(form.watch("quantity") || "0")
  const totalPrice = selectedProduct && quantity ? selectedProduct.price * quantity : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Place Bulk Order</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} - ₹{product.price}/kg
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    {selectedProduct && quantity > 0 && (
                      <span className="font-medium text-green-600">
                        Total: ₹{totalPrice} ({quantity} kg × ₹{selectedProduct.price}/kg)
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>We'll send order updates to this email if provided</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your full delivery address" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
