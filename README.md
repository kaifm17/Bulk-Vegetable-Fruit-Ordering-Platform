# Fresh Harvest - Bulk Produce Ordering Platform

A full-stack web application for ordering fruits and vegetables in bulk, built with Next.js, Tailwind CSS, and PostgreSQL.

## Features

- **Product Catalog**: Browse available fruits and vegetables
- **Bulk Ordering**: Place orders with quantity, contact details, and delivery address
- **Order Tracking**: Track order status (Pending, In Progress, Delivered)
- **Admin Dashboard**: Manage products and orders
- **Email Notifications**: Receive updates about order status changes
- **Analytics**: View sales data and customer information

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Simple JWT-based auth for admin access
- **Email**: Nodemailer for sending notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/fresh-harvest.git
   cd fresh-harvest
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edit the `.env` file with your database connection string and other settings.

4. Set up the database:
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

To access the admin dashboard, use the following credentials:
- Username: `admin`
- Password: `password`

## Database Schema

The application uses the following database schema:

### Products Table
- `id`: Primary key
- `name`: Product name
- `price`: Price per kg
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Orders Table
- `id`: UUID primary key
- `productId`: Foreign key to Products
- `quantity`: Order quantity in kg
- `customerName`: Customer's name
- `contact`: Contact number
- `email`: Email address (optional)
- `address`: Delivery address
- `status`: Order status (Pending, In Progress, Delivered)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- `estimatedDelivery`: Estimated delivery date

## Deployment

This application can be deployed to Vercel with a PostgreSQL database from providers like Neon.tech or Supabase.

1. Create a PostgreSQL database on Neon.tech or any other provider
2. Set up the environment variables on Vercel
3. Deploy the application to Vercel

## License

This project is licensed under the MIT License.
