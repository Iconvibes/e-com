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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Add some items to your cart and they will appear here.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-2 text-left font-semibold">Product</th>
                  <th className="py-3 px-2 text-center font-semibold">Quantity</th>
                  <th className="py-3 px-2 text-right font-semibold">Total</th>
                  <th className="py-3 px-2 text-center font-semibold">Action</th>
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
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-20 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-4 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (7.5%):</span>
                <span className="font-semibold">₦{vat.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors mb-3"
            >
              Proceed to Checkout
            </Link>

            <button
              className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
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
