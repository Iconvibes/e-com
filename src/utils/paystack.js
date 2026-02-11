export const payWithPaystack = ({ email, amount, onSuccess, onClose }) => {
  // Get the public key from environment variables
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  
  if (!publicKey || publicKey.includes("your_")) {
    console.error("❌ Paystack public key is not configured properly.");
    console.error("Please check your .env file and ensure VITE_PAYSTACK_PUBLIC_KEY is set.");
    if (onClose) {
      onClose();
    }
    throw new Error("Paystack payment gateway is not properly configured. Check console for details.");
  }

  // Validate email and amount
  if (!email || !amount) {
    console.error("❌ Email and amount are required for payment");
    if (onClose) {
      onClose();
    }
    throw new Error("Invalid payment details");
  }

  // Check if PaystackPop is available
  if (!window.PaystackPop) {
    console.error("❌ Paystack script not loaded. Ensure the script tag is in index.html");
    if (onClose) {
      onClose();
    }
    throw new Error("Payment gateway failed to load. Please try again.");
  }

  try {
    const handler = window.PaystackPop.setup({
      key: publicKey.trim(), // Trim any whitespace
      email: email.toLowerCase().trim(),
      amount: Math.round(amount * 100), // Convert to kobo (smallest unit)
      currency: "NGN",
      onClose: function () {
        if (onClose) {
          onClose();
        }
      },
      callback: function (response) {
        // The response contains the payment reference
        if (onSuccess) {
          onSuccess(response.reference);
        }
      },
    });

    handler.openIframe();
  } catch (error) {
    console.error("❌ Paystack error:", error);
    if (onClose) {
      onClose();
    }
    throw error;
  }
};

/**
 * Paystack Test Card Details (for reference)
 * When using test keys, the inline modal shows: Success, Bank Authentication, Declined options
 * To use actual card details, switch to standard form in production
 */
export const PAYSTACK_TEST_CARDS = {
  success: {
    number: "4111111111111111",
    cvv: "123",
    expiry: "01/25",
    description: "Visa - Will process successfully"
  },
  failed: {
    number: "4000000000000002",
    cvv: "123",
    expiry: "01/25",
    description: "Visa - Will be declined"
  },
  pending: {
    number: "4200000000000000",
    cvv: "123",
    expiry: "01/25",
    description: "Visa - Pending verification"
  }
};

/**
 * Verify a Paystack payment
 * 
 * ⚠️ SECURITY WARNING: This function uses a secret key on the frontend.
 * Secret keys should NEVER be exposed in frontend code.
 * 
 * For production, verify payments on your backend server instead.
 * See PRODUCTION_SETUP.md for the correct approach.
 */
// DISABLED - Use backend verification instead
// export const verifyPaystackPayment = async (reference) => {
//   // DO NOT USE THIS IN PRODUCTION
//   // Your backend should verify using the secret key
// };
