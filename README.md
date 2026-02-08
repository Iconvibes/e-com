# E-Commerce Store

A modern, full-featured e-commerce application built with React and Vite, featuring product browsing, shopping cart management, secure checkout with Paystack integration, and responsive design using Tailwind CSS.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Stack Justification](#stack-justification)
- [Setup Instructions](#setup-instructions)
- [Payment Flow](#payment-flow)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **State Management**: Zustand (client state) + TanStack React Query (server state)
- **Form Management**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Payment Processing**: Paystack
- **Build Tool**: Vite
- **Code Quality**: ESLint

## Stack Justification

### React 19 + Vite
- **React 19**: The latest version provides improved performance, better TypeScript support, and the latest React features.
- **Vite**: Offers lightning-fast HMR (Hot Module Replacement), faster builds, and a modern development experience. Perfect for modern frontend development.

### Tailwind CSS 4
- Utility-first CSS framework enabling rapid UI development with consistent design tokens
- Smaller bundle sizes compared to traditional CSS frameworks
- Built-in responsive design capabilities with mobile-first approach

### Zustand + TanStack React Query
- **Zustand**: Lightweight state management library with minimal boilerplate for client-side state (cart, user preferences)
- **TanStack React Query**: Industry-standard for server state management, handling data fetching, caching, and synchronization with the backend
- Together they provide a clean separation between local and remote state

### React Hook Form + Zod
- **React Hook Form**: Minimizes re-renders and provides excellent performance for complex forms
- **Zod**: TypeScript-first schema validation, ensuring data integrity at form submission points

### Axios
- Simple, promise-based HTTP client with built-in request/response interceptors
- Great for handling API calls with minimal setup

### React Router v7
- Modern routing library with declarative route definitions
- Supports nested routes, dynamic segments, and advanced features like loaders and actions

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   VITE_API_BASE_URL=your_api_endpoint (optional)
   ```
   
   You can get your Paystack public key from the [Paystack Dashboard](https://dashboard.paystack.com).

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   ```

7. **Linting**
   ```bash
   npm run lint
   ```

## Payment Flow

The e-commerce store uses **Paystack** for secure payment processing. Here's how the payment flow works:

### 1. **Checkout Initiation**
   - User navigates to the checkout page with items in their cart
   - They fill out a form with their details: name, email, phone, address, and city
   - Form validation is handled by Zod schema to ensure data quality

### 2. **Form Submission**
   - Upon form submission, React Hook Form validates the data
   - If validation passes, the `payWithPaystack()` function is triggered
   - Location: [`src/utils/paystack.js`](src/utils/paystack.js)

### 3. **Paystack Modal Launch**
   - The Paystack payment modal is opened via `PaystackPop.setup()`
   - Configuration includes:
     - **Paystack Public Key**: From environment variables
     - **Customer Email**: From checkout form
     - **Amount**: Cart total converted to kobo (₦1 = 100 kobo)
     - **Currency**: NGN (Nigerian Naira)

### 4. **Payment Processing**
   - User enters their payment information in the Paystack modal
   - Paystack securely processes the payment
   - **Success Callback**: 
     - Cart is cleared using Zustand store
     - User is redirected to success page with payment reference
     - Toast notification confirms successful payment
   - **Cancel Callback**: 
     - User is notified that payment was cancelled
     - They remain on the checkout page to retry

### 5. **Success Page**
   - Payment reference is displayed to the user
   - User can save or share their transaction reference for record-keeping
   - Users can return to products to continue shopping

### Payment Flow Diagram

```
User → Checkout Form → Form Validation → Paystack Modal
                                          ↓
                                   Payment Processing
                                          ↓
                    ┌─────────────────────┴──────────────────────┐
                    ↓                                              ↓
              Success (Ref saved)                          Cancelled (Retry)
                    ↓                                              ↓
            Clear Cart + Redirect              Stay on Checkout + Toast Error
                    ↓
              Success Page
```

### Environment Variables Required
- `VITE_PAYSTACK_PUBLIC_KEY`: Your Paystack public key for payment processing

## Project Structure

```
src/
├── pages/              # Route pages (Home, Products, Cart, Checkout, etc.)
├── components/         # Reusable components (ProductCard, Navigation, etc.)
├── layouts/            # Layout components (MainLayout)
├── store/              # Zustand stores (cartStore)
├── hooks/              # Custom React hooks (useProducts)
├── api/                # API integration layer
├── context/            # React context if needed
├── utils/              # Utility functions (paystack integration, constants)
├── assets/             # Static assets
└── App.jsx             # Main App component
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

