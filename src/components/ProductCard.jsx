import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  
  // Parse images safely - handle string or array format
  let images = [];
  try {
    if (product.images) {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      images = Array.isArray(parsed) ? parsed : [parsed];
    }
  } catch (e) {
    console.warn("Failed to parse images for product:", product.id, e);
    images = [];
  }

  // Filter out invalid URLs and use placeholder if empty
  const validImages = images.filter(img => img && typeof img === 'string' && img.trim());
  const displayImages = validImages.length ? validImages : ["https://placehold.co/300x300"];
  const [mainImage, setMainImage] = useState(displayImages[0]);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log("Image failed to load:", mainImage);
    setImageError(true);
    setMainImage("https://placehold.co/300x300");
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 w-full">
      {/* Main Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded mb-2 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 mb-2 overflow-x-auto">
          {displayImages.slice(1).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 2}`}
              className="w-16 h-16 object-cover rounded border cursor-pointer shrink-0"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      {/* Product Info */}
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-4">₦{product.price?.toLocaleString()}</p>

      {/* Add to Cart */}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
