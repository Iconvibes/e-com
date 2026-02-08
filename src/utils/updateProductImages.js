import axios from "axios";

// Sample product images from Picsum (reliable, CORS-enabled)
const sampleImages = [
  [
    "https://picsum.photos/500/500?random=1",
    "https://picsum.photos/500/500?random=2",
  ],
  [
    "https://picsum.photos/500/500?random=3",
    "https://picsum.photos/500/500?random=4",
  ],
  [
    "https://picsum.photos/500/500?random=5",
    "https://picsum.photos/500/500?random=6",
  ],
  [
    "https://picsum.photos/500/500?random=7",
    "https://picsum.photos/500/500?random=8",
  ],
];

export const updateProductsWithImages = async () => {
  try {
    // Fetch all products
    const res = await axios.get("https://api.oluwasetemi.dev/products");
    const products = res.data.data;

    console.log(`Found ${products.length} products. Updating with images...`);

    // Update each product with sample images
    const updatePromises = products.map((product, index) => {
      const images = sampleImages[index % sampleImages.length];
      const imageArray = JSON.stringify(images);

      return axios.patch(
        `https://api.oluwasetemi.dev/products/${product.id}`,
        { images: imageArray }
      ).catch(err => {
        console.warn(`Failed to update product ${product.id}:`, err.response?.data || err.message);
      });
    });

    await Promise.all(updatePromises);
    console.log("✅ All products updated with images!");
    window.location.reload(); // Reload to see updated images
  } catch (error) {
    console.error("Error updating products:", error);
    alert("Failed to update products. Check console for details.");
  }
};
