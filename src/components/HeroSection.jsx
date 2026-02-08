import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="h-screen bg-linear-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white">
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to QuickServe
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Quality Products at Great Prices
        </p>
        <p className="text-lg mb-8 text-blue-50">
          Discover our curated collection of premium products delivered straight to your door
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
