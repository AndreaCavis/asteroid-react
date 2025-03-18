"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { Product, ProductState } from "@/lib/validators/product-validator";
import { useDebounce, useDebouncedCallback } from "use-debounce";

export const SORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

// Filter Options (Constants)
export const SORT_FILTERS = {
  id: "sort",
  name: "sort",
  options: [
    { value: "none", label: "None" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ],
} as const;

export const TYPE_FILTERS = {
  id: "type",
  name: "Type",
  options: [
    { value: "bcaa", label: "BCAA" },
    { value: "beta alanine", label: "Beta-Alanine" },
    { value: "creatine", label: "Creatine" },
    { value: "whey protein", label: "Whey Protein" },
  ] as const,
};

export const BRAND_FILTERS = {
  id: "brand",
  name: "Brand",
  options: [
    { value: "MyProtein", label: "MyProtein" },
    { value: "Optimum Nutrition", label: "Optimum Nutrition" },
    { value: "Yamamoto Nutrition", label: "Yamamoto Nutrition" },
  ],
} as const;

export const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 100], label: "Any price" },
    { value: [0, 25], label: "Under £25" },
    { value: [0, 50], label: "Under £50" },
    { value: [0, 75], label: "Under £75" },
    // Custom option defined in TSX
  ],
} as const;

export const DEFAULT_CUSTOM_PRICE: [number, number] = [0, 100];

// Define Context Shape
interface FiltersContextType {
  filter: ProductState;
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  products: Product[];
  debouncedRefetch: () => void;
}

// Create Context
const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<ProductState>({
    sort: "none",
    type: ["bcaa", "beta alanine", "creatine", "whey protein"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    brand: ["MyProtein", "Optimum Nutrition", "Yamamoto Nutrition"],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const firstRender = useRef(true); // ✅ Track initial render

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ filter }),
        body: JSON.stringify({
          filter: {
            sort: filter.sort,
            type: filter.type,
            price: filter.price.range,
            brand: filter.brand,
          },
        }),
      });

      console.log("Response status:", response.status); // ✅ Debugging

      if (!response.ok) throw new Error("Failed to fetch products");

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("ERROR fetching products:", error);
      setProducts([]);
    }
  };

  const debouncedRefetch = useDebouncedCallback(fetchProducts, 400);

  useEffect(() => {
    debouncedRefetch();
  }, [filter]);

  return (
    <FiltersContext.Provider value={{ filter, setFilter, products, debouncedRefetch }}>
      {children}
    </FiltersContext.Provider>
  );
};

// Custom Hook for Accessing Filters
export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
