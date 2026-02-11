import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="h-screen bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center text-white transition-colors duration-200">
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to QuickServe
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-blue-200">
          Quality Products at Great Prices
        </p>
        <p className="text-lg mb-8 text-blue-50 dark:text-blue-100">
          Discover our curated collection of premium products delivered straight to your door
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-4 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all transform hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
