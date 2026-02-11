import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { updateProductsWithImages } from "../utils/updateProductImages";

const fetchProducts = async () => {
  const res = await fetch("https://api.oluwasetemi.dev/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function FeaturedProducts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const imagesUpdatedRef = useRef(false);

  // Auto-update images if they're still placeholders
  useEffect(() => {
    if (data && !imagesUpdatedRef.current) {
      const products = data?.data || data || [];
      const hasPlaceholders = products.some((p) =>
        p.images?.includes("placehold")
      );

      if (hasPlaceholders) {
        imagesUpdatedRef.current = true;
        updateProductsWithImages();
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-500 dark:text-gray-400">Loading featured products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-red-500 dark:text-red-400">{error?.message || "Failed to load products"}</p>
      </div>
    );
  }

  // Handle both data.data and direct array formats
  const products = (data?.data || data || []).slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Featured Products</h2>
        <p className="text-gray-600 dark:text-gray-400">Check out our handpicked selection of quality items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
