"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentCustomers = [
  { id: 1, name: "Olivia Martin", email: "olivia.martin@email.com", spent: "₹1,999" },
  { id: 2, name: "Jackson Lee", email: "jackson.lee@email.com", spent: "₹1,499" },
  { id: 3, name: "Isabella Nguyen", email: "isabella.nguyen@email.com", spent: "₹1,299" },
  { id: 4, name: "William Kim", email: "william.kim@email.com", spent: "₹999" },
  { id: 5, name: "Sofia Davis", email: "sofia.davis@email.com", spent: "₹899" },
]

export function RecentCustomers() {
  return (
    <div className="space-y-8">
      {recentCustomers.map((customer) => (
        <div key={customer.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{customer.name}</p>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          </div>
          <div className="ml-auto font-medium">{customer.spent}</div>
        </div>
      ))}
    </div>
  )
}
