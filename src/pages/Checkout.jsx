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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart is Empty</h2>
          <p className="text-gray-600 mb-6">You need items in your cart to checkout.</p>
          <button
            onClick={() => navigate("/products")}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      payWithPaystack({
        email: data.email,
        amount: total,
        onSuccess: (ref) => {
          clearCart();
          navigate(`/success?ref=${ref}`);
          toast.success("Payment successful!");
        },
        onClose: () => {
          toast.error("Payment cancelled");
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="+234 XXX XXXX XXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Street Address</label>
              <input
                type="text"
                {...register("address")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">City</label>
              <input
                type="text"
                {...register("city")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Lagos"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isSubmitting ? "Processing..." : "Pay with Paystack"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-20 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="max-h-96 overflow-y-auto mb-4 pb-4 border-b">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (7.5%):</span>
                <span className="font-semibold">₦{vat.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              💳 Your payment is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
