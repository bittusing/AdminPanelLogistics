# Flywell Logistics - Admin Panel

Complete admin panel for managing Flywell Logistics platform.

## Features

### 📊 Dashboard
- Total users, orders, and revenue statistics
- Today's metrics
- Revenue trend charts
- Order status distribution (pie chart)
- Order statistics (bar chart)

### 👥 Users Management
- View all registered users
- Search by name, email, or phone
- Filter by KYC status
- View user details (wallet balance, KYC status)
- Activate/Deactivate users
- Pagination support

### 📦 Orders Management
- View all orders
- Search by AWB number or Order ID
- Filter by order status
- View customer details
- Track order amounts and dates
- Pagination support

### 💳 Payments
- View all payment transactions
- Filter by payment status
- View transaction details
- Track payment amounts and dates
- Pagination support

### 📈 Analytics
- Revenue and profit trends
- Orders trend analysis
- Top customers by spending
- Customizable time periods (7/30/90 days)
- Interactive charts

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6

## Installation

```bash
# Navigate to admin panel directory
cd logisticsAdminPanel

# Install dependencies
npm install

# Start development server
npm run dev
```

The admin panel will run on `http://localhost:3001`

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Login

Only users with `role: 'admin'` can access the admin panel.

**Default Admin Credentials** (if you create one):
- Email: admin@flywell.com
- Password: your_admin_password

## Creating an Admin User

You need to manually create an admin user in the database:

### Method 1: Using MongoDB Compass or Shell

```javascript
// Update existing user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 2: Register and Update

1. Register a normal user through the main app
2. Update the user's role to 'admin' in the database
3. Login to admin panel with those credentials

## API Endpoints Used

### Authentication
- `POST /api/auth/login` - Admin login

### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/analytics/revenue?period=30days` - Revenue analytics
- `GET /api/admin/analytics/orders?period=30days` - Order analytics

### Users
- `GET /api/admin/users?page=1&limit=10&search=&kycStatus=` - Get all users
- `GET /api/admin/users/:userId` - Get user details
- `PUT /api/admin/users/:userId/status` - Update user status

### Orders
- `GET /api/admin/orders?page=1&limit=10&status=&search=` - Get all orders
- `GET /api/admin/orders/:orderId` - Get order details

### Payments
- `GET /api/admin/payments?page=1&limit=10&status=` - Get payment transactions

### Analytics
- `GET /api/admin/customers/top?limit=10` - Get top customers
- `GET /api/admin/activities?limit=20` - Get recent activities

## Features Breakdown

### Dashboard Page
- 4 stat cards (Users, Orders, Revenue, Pending Orders)
- Revenue trend line chart
- Order status pie chart
- Order statistics bar chart
- Period selector (7/30/90 days)

### Users Page
- Search functionality
- KYC status filter
- User activation/deactivation
- Wallet balance display
- Pagination

### Orders Page
- Search by AWB/Order ID
- Status filter
- Customer information
- Order tracking
- Pagination

### Payments Page
- Transaction listing
- Status filter
- User information
- Amount tracking
- Pagination

### Analytics Page
- Revenue & profit trends
- Orders trend
- Top 5 customers
- Period selector
- Interactive charts

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
logisticsAdminPanel/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout with sidebar
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── config/
│   │   └── api.js              # Axios configuration
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Dashboard.jsx       # Dashboard with stats & charts
│   │   ├── Users.jsx           # Users management
│   │   ├── Orders.jsx          # Orders management
│   │   ├── Payments.jsx        # Payments listing
│   │   └── Analytics.jsx       # Analytics & insights
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Security

- JWT token-based authentication
- Admin role verification
- Protected routes
- Automatic token refresh
- Logout on 401 errors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - Flywell Logistics

---

**Last Updated:** January 22, 2026
**Version:** 1.0.0
