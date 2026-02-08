import { useSearchParams, Link } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("ref") || "N/A";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-4xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 Text-lg mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <p className="text-gray-600 text-sm font-semibold mb-2">Reference Number:</p>
          <p className="text-xl font-bold text-gray-800 break-all">{reference}</p>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          A confirmation email has been sent to your inbox. You can use the reference
          number above to track your order.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
