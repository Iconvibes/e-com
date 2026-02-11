# E-Commerce Store

A modern, full-featured e-commerce application built with React and Vite, featuring product browsing, shopping cart management, secure checkout with Paystack integration, and responsive design using Tailwind CSS.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Stack Justification](#stack-justification)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Payment Integration](#payment-integration)
- [Theme/Dark Mode](#themedark-mode)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Security & Production](#security--production)

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

## Features

- 🛍️ **Product Browsing**: Browse products fetched from API with loading and error states
- 🛒 **Shopping Cart**: Add/remove items from cart with persistent state management
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- 💳 **Secure Checkout**: Complete checkout flow with form validation
- 💰 **Paystack Payment**: Test mode with Success/Bank Authentication/Declined options
- 📱 **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds
- 🔒 **Secure**: Environment variables protected, no hardcoded secrets

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
   
   Create a `.env.local` file in the root directory (this file is ignored by Git for security):
   ```dotenv
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_057509cf28e042f5f0a1c187154070f7f1ec4625
   ```
   
   **For Production**: See [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md) for live key configuration and backend setup.

## Environment Variables

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key (test or live) | `pk_test_...` or `pk_live_...` |

**⚠️ Security Note**: 
- `.env.local` is **automatically ignored by Git** (see `.gitignore`)
- Never commit files containing secret keys
- The `pk_test_...` key in `.env` is **safe to commit** (it's a test key)
- Production secret keys should only be stored on your backend server

### Backend (Server Only)
For production payment verification, your backend needs:
```
PAYSTACK_SECRET_KEY=sk_live_your_actual_key_here
```
This should **NEVER** be in your frontend `.env.local` file.

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

## Payment Integration

### Current Status: Test Mode
The application is currently configured in **Paystack Test Mode** with a simplified payment modal showing:
- ✅ Success
- ⚠️ Bank Authentication  
- ❌ Declined

These options allow testing different payment scenarios without charging real money.

### How the Payment Flow Works

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

**🔄 Production Migration**: Ready to go live? See [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md) for:
- How to get live Paystack keys
- Backend payment verification setup
- CSP headers configuration
- Deployment steps

## Theme/Dark Mode

### Features
- 🌙 **Dark Mode**: Automatic detection of system preference (macOS/Windows dark mode)
- 💾 **Persistence**: Theme preference is saved to localStorage and persists across sessions
- 🔄 **Toggle Button**: Manual theme toggle in the navigation bar
- 🎨 **Tailwind Integration**: Uses Tailwind CSS class-based dark mode strategy

### How It Works
1. On first visit, system preference is detected via `matchMedia("(prefers-color-scheme: dark)")`
2. Theme preference is stored in localStorage
3. Pre-initialization script in `index.html` prevents theme flash on page load
4. Click sun/moon icon in navigation to toggle between light and dark modes
5. All components have dark mode styling with Tailwind's `dark:` prefix

### Dark Mode Implementation
- **Context**: `src/context/ThemeContext.jsx` manages theme state globally
- **Hook**: `useTheme()` custom hook for accessing theme and toggle function
- **Storage**: localStorage key: `theme` (values: `"light"` or `"dark"`)
- **Styling**: All components use Tailwind CSS dark mode classes

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

## Security & Production

### Security Features

✅ **Environment Variables Protected**
- `.env` and `.env.local` files are in `.gitignore` 
- Secret keys are never committed to Git
- Test keys (`pk_test_...`) are safe if accidentally committed

✅ **No Hardcoded Secrets**
- All sensitive API keys are loaded from environment variables only
- Frontend code contains no secret keys or credentials

✅ **Paystack Security**
- Payment processing handled entirely by Paystack's secure modal
- No sensitive payment data is handled by your frontend
- Secret keys are NOT used in frontend code

### Converting to Production

When you're ready to deploy with real payments:

1. **Read** [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md) - Complete guide including:
   - How to get live Paystack keys
   - Backend payment verification code (Node.js/Express example)
   - Deployment steps
   - Security checklist

2. **Key Changes Required**:
   - Get live Paystack keys from [Paystack Dashboard](https://dashboard.paystack.com)
   - Create backend endpoint for payment verification
   - Update `.env` with live public key
   - Store backend secret key only on server (never in frontend)
   - Enable proper HTTPS and CSP headers

3. **Test Cards** (work with live keys):
   - Number: `4111111111111111`
   - CVV: Any 3 digits
   - Expiry: Any valid future date
   - OTP: `123456`

### Pre-Deployment Checklist

- [ ] Environment variables configured securely
- [ ] No hardcoded API keys in codebase
- [ ] `.gitignore` protecting sensitive files
- [ ] Paystack keys obtained from dashboard
- [ ] Backend payment verification endpoint created
- [ ] HTTPS enabled on production domain
- [ ] CSP headers configured (if needed)
- [ ] Tested payment flow end-to-end
- [ ] Error handling and logging in place
- [ ] PRODUCTION_SETUP.md reviewed

### Support & Resources

- 📚 [Paystack Documentation](https://paystack.com/docs)
- 💬 [Paystack Support](support@paystack.com)
- 🐛 [Report Issues](https://github.com/yourusername/ecommerce/issues)
- 📖 [Production Setup Guide](PRODUCTION_SETUP.md)

