import { Search, ShoppingCart, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  icon?: "search" | "cart" | "alert"
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ title, description, icon = "alert", action }: EmptyStateProps) {
  const Icon = {
    search: Search,
    cart: ShoppingCart,
    alert: AlertCircle,
  }[icon]

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && (
        <Button asChild className="mt-6">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}
