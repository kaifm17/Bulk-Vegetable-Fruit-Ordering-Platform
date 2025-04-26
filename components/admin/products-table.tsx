"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import type { Product } from "@/types"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface AdminProductsTableProps {
  limit?: number
}

export function AdminProductsTable({ limit }: AdminProductsTableProps) {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([
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
  ])

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [editedName, setEditedName] = useState("")
  const [editedPrice, setEditedPrice] = useState("")

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setEditedName(product.name)
    setEditedPrice(product.price.toString())
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product)
    setDeleteDialogOpen(true)
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id
        ? { ...product, name: editedName, price: Number.parseFloat(editedPrice) }
        : product,
    )

    setProducts(updatedProducts)
    setEditDialogOpen(false)

    toast({
      title: "Product updated",
      description: `${editedName} has been updated successfully.`,
    })
  }

  const handleDeleteProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.filter((product) => product.id !== currentProduct.id)
    setProducts(updatedProducts)
    setDeleteDialogOpen(false)

    toast({
      title: "Product deleted",
      description: `${currentProduct.name} has been deleted.`,
    })
  }

  const displayedProducts = limit ? products.slice(0, limit) : products

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price (₹/kg)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>₹{product.price}</TableCell>
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
                    <DropdownMenuItem onClick={() => openEditDialog(product)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(product)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Make changes to the product details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (₹/kg)</Label>
              <Input id="price" type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
