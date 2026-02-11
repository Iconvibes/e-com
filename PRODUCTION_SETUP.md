# Production Setup Guide for Paystack Payment Integration

## Current Status: Test Mode ✅

the site is currently running in **Paystack Test Mode** with a simplified payment modal that shows:
- Success
- Bank Authentication  
- Declined

This is perfect for development and testing different payment scenarios.

---

## Migration to Production Mode

Follow these steps when you're ready to deploy to production with real card entry forms and live transactions.

### Step 1: Get Your Live Paystack Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com)
2. Log in with your account
3. Click **Settings** (bottom left)
4. Go to **API Keys & Webhooks**
5. Copy both:
   - **Live Public Key** (starts with `pk_live_`)
   - **Live Secret Key** (starts with `sk_live_`)

### Step 2: Update Environment Variables

#### Frontend (.env.local)
```env
# Production - Live Keys
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_key_here
```

#### Backend (.env) - NODE/EXPRESS ONLY
```env
# Production - Secret Key (NEVER expose in frontend)
PAYSTACK_SECRET_KEY=sk_live_your_actual_key_here
```

### Step 3: Create a Backend Payment Verification Endpoint

You MUST verify payments on your backend server. Here's a Node.js/Express example:

```javascript
// /api/verify-payment (POST endpoint)
import axios from 'axios';

app.post('/api/verify-payment', async (req, res) => {
  const { reference } = req.body;
  
  if (!reference) {
    return res.status(400).json({ success: false, message: 'Reference required' });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { data } = response.data;

    if (data.status === 'success') {
      // ✅ Payment verified - create order in database
      // Save order details, mark as paid, etc.
      return res.json({ 
        success: true, 
        message: 'Payment verified',
        amount: data.amount / 100, // Convert from kobo back to naira
        email: data.customer.email,
      });
    } else {
      // ❌ Payment failed or pending
      return res.status(400).json({ 
        success: false, 
        message: `Payment ${data.status}`,
        status: data.status 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Verification failed' 
    });
  }
});
```

### Step 4: Update Frontend Checkout to Use Backend Verification

Update `src/pages/Checkout.jsx`:

```javascript
const onSubmit = async (data) => {
  try {
    if (!total || total <= 0) {
      toast.error("Invalid order amount. Please check your cart.");
      return;
    }

    const toastId = toast.loading("Processing payment...");

    payWithPaystack({
      email: data.email,
      amount: total,
      onSuccess: async (ref) => {
        try {
          // Call your backend to verify payment
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: ref }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            toast.dismiss(toastId);
            toast.success("Payment successful! Redirecting...");
            
            // Store order in database (optional - done on backend)
            clearCart();
            setTimeout(() => {
              navigate(`/success?ref=${ref}`);
            }, 1000);
          } else {
            toast.dismiss(toastId);
            toast.error(`Payment ${verifyData.status}. Please try again.`);
          }
        } catch (verifyError) {
          console.error("Payment verification failed:", verifyError);
          toast.dismiss(toastId);
          toast.error("Could not verify payment. Please try again.");
        }
      },
      onClose: () => {
        toast.dismiss(toastId);
        toast.error("Payment was cancelled. Please try again.");
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    toast.error(error.message || "An error occurred during checkout. Please try again.");
  }
};
```

### Step 5: Enable CSP Headers for Production (Optional)

If you set up CSP headers (Content Security Policy), ensure your `vite.config.js` or server includes:

```javascript
'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://js.paystack.co https://*.paystack.co; connect-src 'self' https://api.paystack.co https://*.paystack.co https://yourdomain.com"
```

Or handle CSP in your production server headers (Nginx, Apache, etc.).

### Step 6: Test with Live Keys (Using Test Cards)

Once you've added live keys, Paystack will:
- Show a **real card entry form** instead of the test modal
- Accept test card: `4111111111111111`
- Accept any future expiry date (e.g., `01/25`)
- Accept any 3-digit CVV (e.g., `123`)
- Require OTP: `123456`

**These test cards will NOT charge you** - they're for development even in live mode.

---

## Test Card Details

| Card Type | Number | CVV | Expiry | OTP |
|-----------|--------|-----|--------|-----|
| Visa (Success) | 4111111111111111 | Any 3 digits | Any future date | 123456 |
| Visa (Declined) | 4000000000000002 | Any 3 digits | Any future date | 123456 |

---

## Security Checklist

- ✅ Public key in frontend (`.env.local` with `VITE_` prefix)
- ❌ **NEVER** expose secret key in frontend code
- ❌ **NEVER** commit `PAYSTACK_SECRET_KEY` to version control
- ✅ Always verify payments on your backend
- ✅ Use HTTPS in production
- ✅ Store order details securely in database
- ✅ Send confirmation emails to customers

---

## Deployment Steps

1. **Update environment variables on your hosting/server:**
   - Set `VITE_PAYSTACK_PUBLIC_KEY` (live key)
   - Set `PAYSTACK_SECRET_KEY` in your backend (live key)

2. **Build and deploy:**
   ```bash
   npm run build
   npm start
   ```

3. **Test the full flow:**
   - Add items to cart
   - Checkout with test card
   - Verify payment on backend
   - Check order in database
   - Confirm email sent to customer

4. **Monitor transactions:**
   - Go to [Paystack Dashboard](https://dashboard.paystack.com)
   - Check Transactions → Live for real payments

---

## Troubleshooting

### Payment Modal Shows "Invalid Key"
- Check that live public key is correctly set in `.env.local`
- Verify key is not expired in Paystack dashboard
- Restart dev server after changing `.env.local`

### Backend Verification Fails
- Ensure `PAYSTACK_SECRET_KEY` is set on your backend server
- Check that Authorization header format is correct: `Bearer sk_live_xxx`
- Verify payment reference is being passed correctly from frontend

### CSP Errors
- Add Paystack domains to Content Security Policy headers
- Allow your API domain in `connect-src` directive

---

## Support

- Paystack Documentation: https://paystack.com/docs
- Paystack Status: https://status.paystack.com
- Support Email: support@paystack.com

---

**Last Updated:** February 11, 2026
**Current Mode:** Test (Success/Authentication/Declined)
