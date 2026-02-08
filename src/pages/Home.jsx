import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import ProductCard from "../components/ProductCard";

// const fetchProducts = async () => {
//   const res = await fetch("https://api.oluwasetemi.dev/products");
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// };

// const Home = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//     staleTime: 1000 * 60 * 5, // 5 minutes cache
//   });

//   if (isLoading) return <p className="text-center mt-10 text-gray-600">Loading products...</p>;
//   if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-brandBlue">E-Commerce Store</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {data.data.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://api.oluwasetemi.dev/products")
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.data);
//         setLoading(false);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading products...</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-brandBlue">E-Commerce Store</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import useProducts from "../hooks/useProducts";
// import ProductCard from "../components/ProductCard";

// export default function Home() {
//   const { data: products = [], isLoading, error } = useProducts();

//   if (isLoading) return <p className="p-8">Loading products...</p>;
//   if (error) return <p className="p-8 text-red-500">Error loading products</p>;
//   if (products.length === 0)
//     return <p className="p-8 text-gray-500">No products available</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-brandBlue mb-6">E-Commerce Store</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useProducts } from "../hooks/useProducts";
// import ProductCard from "../components/ProductCard";

// export default function Home() {
//   const { data, isLoading, isError } = useProducts();

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Something went wrong</p>;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {data.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }
