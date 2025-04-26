"use client"

import { useState } from "react"
import { CheckCircle, Clock, MoreHorizontal, Truck, Mail } from "lucide-react"

import type { Order } from "@/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminOrdersTableProps {
  limit?: number
}

export function AdminOrdersTable({ limit }: AdminOrdersTableProps) {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "abc123",
      productId: 1,
      productName: "Apples",
      quantity: 25,
      customerName: "John Doe",
      contact: "9876543210",
      email: "john@example.com",
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
      email: "jane@example.com",
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
      email: "bob@example.com",
      address: "789 Pine St, City, State, 12345",
      status: "Delivered",
      createdAt: "2023-04-16T09:15:00Z",
    },
    {
      id: "jkl012",
      productId: 2,
      productName: "Bananas",
      quantity: 40,
      customerName: "Alice Brown",
      contact: "6543210987",
      email: "alice@example.com",
      address: "101 Elm St, City, State, 12345",
      status: "Pending",
      createdAt: "2023-04-15T16:45:00Z",
    },
    {
      id: "mno345",
      productId: 8,
      productName: "Oranges",
      quantity: 35,
      customerName: "Charlie Davis",
      contact: "5432109876",
      email: "charlie@example.com",
      address: "202 Maple St, City, State, 12345",
      status: "In Progress",
      createdAt: "2023-04-14T11:10:00Z",
    },
    {
      id: "pqr678",
      productId: 4,
      productName: "Potatoes",
      quantity: 60,
      customerName: "Diana Evans",
      contact: "4321098765",
      email: "diana@example.com",
      address: "303 Cedar St, City, State, 12345",
      status: "Pending",
      createdAt: "2023-04-13T13:25:00Z",
    },
    {
      id: "stu901",
      productId: 6,
      productName: "Onions",
      quantity: 45,
      customerName: "Edward Foster",
      contact: "3210987654",
      email: "edward@example.com",
      address: "404 Birch St, City, State, 12345",
      status: "Delivered",
      createdAt: "2023-04-12T08:50:00Z",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false)

  const updateOrderStatus = (orderId: string, newStatus: "Pending" | "In Progress" | "Delivered") => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    toast({
      title: "Order status updated",
      description: `Order #${orderId} is now ${newStatus}`,
    })

    // In a real app, this would send an API request to update the status
    // const response = await fetch(`/api/admin/orders/${orderId}`, {
    //   method: "PUT",
    //   body: JSON.stringify({ status: newStatus }),
    // })
  }

  const sendNotification = (order: Order) => {
    // In a real app, this would send an email notification
    toast({
      title: "Notification sent",
      description: `Email notification sent to ${order.email}`,
    })
    setNotifyDialogOpen(false)
  }

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setDetailsOpen(true)
  }

  const openNotifyDialog = (order: Order) => {
    setSelectedOrder(order)
    setNotifyDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Truck className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const displayedOrders = limit ? orders.slice(0, limit) : orders

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                {order.productName} ({order.quantity} kg)
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => viewOrderDetails(order)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Pending")}>
                      Mark as Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "In Progress")}>
                      Mark as In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Delivered")}>
                      Mark as Delivered
                    </DropdownMenuItem>
                    {order.email && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openNotifyDialog(order)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Notification
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id} placed on{" "}
              {selectedOrder?.createdAt && new Date(selectedOrder.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Total</h4>
                  <p className="mt-1">₹{selectedOrder.quantity * 100}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Product</h4>
                <p className="mt-1">
                  {selectedOrder.productName} ({selectedOrder.quantity} kg)
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Customer Information</h4>
                <div className="mt-1 space-y-1">
                  <p>{selectedOrder.customerName}</p>
                  <p>{selectedOrder.contact}</p>
                  {selectedOrder.email && <p>{selectedOrder.email}</p>}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Delivery Address</h4>
                <p className="mt-1">{selectedOrder.address}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Dialog */}
      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send an email notification to {selectedOrder?.customerName} about their order status.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedOrder && sendNotification(selectedOrder)}>Send Notification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
