"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Generate mock data for the chart
const generateData = () => {
  const currentDate = new Date()
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const data = []

  for (let i = 1; i <= daysInMonth; i++) {
    // Generate a random value between 500 and 3000
    const value = Math.floor(Math.random() * 2500) + 500

    // Format the date as day of month
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    const formattedDate = date.getDate().toString()

    data.push({
      name: formattedDate,
      total: value,
    })
  }

  return data
}

export function SalesChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip formatter={(value: number) => [`₹${value}`, "Revenue"]} labelFormatter={(label) => `Day ${label}`} />
          <Bar dataKey="total" fill="#16a34a" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
