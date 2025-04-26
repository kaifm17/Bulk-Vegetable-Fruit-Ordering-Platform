import nodemailer from "nodemailer"
import type { Order } from "@/types"

// Configure email transporter
// For production, use your actual SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASSWORD || "password",
  },
})

export async function sendOrderConfirmation(order: Order) {
  if (!order.email) return false

  try {
    const info = await transporter.sendMail({
      from: `"Fresh Harvest" <${process.env.SMTP_FROM || "noreply@example.com"}>`,
      to: order.email,
      subject: `Order Confirmation - #${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Your Order Has Been Received</h2>
          <p>Dear ${order.customerName},</p>
          <p>Thank you for your order. We've received your request for:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Product:</strong> ${order.productName}</p>
            <p><strong>Quantity:</strong> ${order.quantity} kg</p>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          <p>You can track your order status at any time by visiting:</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/track/${order.id}" style="color: #16a34a;">Track Your Order</a></p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Thank you for choosing Fresh Harvest!</p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

export async function sendStatusUpdate(order: Order) {
  if (!order.email) return false

  const statusMessages = {
    Pending: "Your order has been received and is awaiting processing.",
    "In Progress": "Your order is now being prepared and will be shipped soon.",
    Delivered: "Your order has been delivered successfully. Thank you for shopping with us!",
  }

  try {
    const info = await transporter.sendMail({
      from: `"Fresh Harvest" <${process.env.SMTP_FROM || "noreply@example.com"}>`,
      to: order.email,
      subject: `Order Status Update - #${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Order Status Update</h2>
          <p>Dear ${order.customerName},</p>
          <p>Your order status has been updated to: <strong>${order.status}</strong></p>
          <p>${statusMessages[order.status as keyof typeof statusMessages]}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Product:</strong> ${order.productName}</p>
            <p><strong>Quantity:</strong> ${order.quantity} kg</p>
            <p><strong>Order ID:</strong> ${order.id}</p>
          </div>
          <p>You can track your order status at any time by visiting:</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/track/${order.id}" style="color: #16a34a;">Track Your Order</a></p>
          <p>Thank you for choosing Fresh Harvest!</p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}
