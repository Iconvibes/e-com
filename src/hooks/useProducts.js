import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://api.oluwasetemi.dev/products");
        return res.data.data; // <--- ONLY return the "data" array
      } catch (err) {
        console.error("Error fetching products:", err);
        return []; // fallback empty array
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
