import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import CartItemRow from "../components/CartItemRow";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const subtotal = useCartStore((state) => state.subtotal());
  const vat = useCartStore((state) => state.vat());
  const total = useCartStore((state) => state.total());

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some items to your cart and they will appear here.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Table */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg overflow-x-auto transition-colors duration-200">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="py-3 px-2 text-left font-semibold text-gray-700 dark:text-gray-300">Product</th>
                  <th className="py-3 px-2 text-center font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
                  <th className="py-3 px-2 text-right font-semibold text-gray-700 dark:text-gray-300">Total</th>
                  <th className="py-3 px-2 text-center font-semibold text-gray-700 dark:text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onIncrease={increaseQty}
                    onDecrease={decreaseQty}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Continue Shopping Link */}
          <div className="mt-6">
            <Link
              to="/products"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-20 h-fit transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Order Summary</h2>

            <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Items:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{cart.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">VAT (7.5%):</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">₦{vat.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">Total:</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors mb-3"
            >
              Proceed to Checkout
            </Link>

            <button
              className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors dark:hover:bg-gray-700"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
