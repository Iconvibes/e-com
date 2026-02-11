import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "../store/cartStore";
import { payWithPaystack } from "../utils/paystack";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const checkoutSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal());
  const vat = useCartStore((state) => state.vat());
  const total = useCartStore((state) => state.total());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need items in your cart to checkout.</p>
          <button
            onClick={() => navigate("/products")}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      // Validate total amount
      if (!total || total <= 0) {
        toast.error("Invalid order amount. Please check your cart.");
        return;
      }

      // Show processing message
      const toastId = toast.loading("Processing payment...");

      payWithPaystack({
        email: data.email,
        amount: total,
        onSuccess: (ref) => {
          toast.dismiss(toastId);
          toast.success("Payment successful! Redirecting...");
          
          // Store order details
          const orderDetails = {
            customerName: data.name,
            customerEmail: data.email,
            customerPhone: data.phone,
            address: data.address,
            city: data.city,
            amount: total,
            paymentRef: ref,
            timestamp: new Date().toISOString(),
          };
          console.log("Order placed:", orderDetails);
          
          // TODO: In production, verify payment on your backend using the reference
          // Your backend should call: POST https://api.paystack.co/transaction/verify/{ref}
          // with Authorization: Bearer sk_live_xxx (secret key)
          
          // Clear cart and navigate
          clearCart();
          setTimeout(() => {
            navigate(`/success?ref=${ref}`);
          }, 1000);
        },
        onClose: () => {
          toast.dismiss(toastId);
          toast.error("Payment was cancelled. Please try again.");
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.message || "An error occurred during checkout. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-lg space-y-6 transition-colors duration-200">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="+234 XXX XXXX XXX"
              />
              {errors.phone && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Street Address</label>
              <input
                type="text"
                {...register("address")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">City</label>
              <input
                type="text"
                {...register("city")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="Lagos"
              />
              {errors.city && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isSubmitting ? "Processing..." : "Pay with Paystack"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-20 h-fit transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Order Summary</h2>

            <div className="max-h-96 overflow-y-auto mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">VAT (7.5%):</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">₦{vat.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-800 dark:text-gray-100">Total:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              💳 Your payment is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
