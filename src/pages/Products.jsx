import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { updateProductsWithImages } from "../utils/updateProductImages";

const fetchProducts = async () => {
  const res = await fetch("https://api.oluwasetemi.dev/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
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
        <p className="text-center text-gray-500 dark:text-gray-400">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-red-500 dark:text-red-400">
          {error?.message || "Failed to load products"}
        </p>
      </div>
    );
  }

  // Handle both data.data and direct array formats
  let products = data?.data || data || [];

  // Filter products by search term
  if (searchTerm) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">All Products</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-400">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
