"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, ProductState } from "@/lib/validators/product-validator";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams } from "next/navigation";

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

export const RESET_FILTERS: ProductState = {
  sort: "none",
  type: ["bcaa", "beta alanine", "creatine", "whey protein"],
  price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
  brand: ["MyProtein", "Optimum Nutrition", "Yamamoto Nutrition"],
};

// Define Context Shape
interface FiltersContextType {
  filter: ProductState;
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  searchQuery: string; // Store searchQuery separately
  products: Product[];
  debouncedRefetch: () => void;
}

// Create Context
const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const searchParamsFilter = useSearchParams();

  const searchQuery = searchParamsFilter.get("query") || ""; // Get search query from URL

  const [filter, setFilter] = useState<ProductState>({
    sort: "none",
    type: ["bcaa", "beta alanine", "creatine", "whey protein"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    brand: ["MyProtein", "Optimum Nutrition", "Yamamoto Nutrition"],
  });

  const [products, setProducts] = useState<Product[]>([]);

  const pathname = usePathname(); // Get current page
  const searchParams = useSearchParams(); // Get search query

  const fetchProducts = async () => {
    try {
      const searchQuery = searchParams.get("query") || ""; // Get search term from URL

      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filter: {
            sort: filter.sort,
            type: filter.type,
            price: filter.price.range,
            brand: filter.brand,
          },
          searchQuery: pathname === "/search" ? searchQuery : null, // Only send search query if on search page
        }),
      });

      console.log("Response status:", response.status); // Debugging

      if (!response.ok) throw new Error("Failed to fetch products");

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("ERROR fetching products:", error);
      setProducts([]);
    }
  };

  const debouncedRefetch = useDebouncedCallback(fetchProducts, 400);

  // Fetches products when filters change
  useEffect(() => {
    if (pathname === "/") {
      setFilter(RESET_FILTERS); // Reset filters when returning home
    } else {
      setFilter((prev) => ({
        ...RESET_FILTERS, // Reset all filters EXCEPT the search query
        searchQuery,
      }));
    }
    debouncedRefetch();
  }, [pathname, searchQuery]); // Listen for page changes & new searches

  // Updates checkboxes when products arrive
  useEffect(() => {
    if (products.length > 0) {
      // Extract available brands & types from products
      const availableBrands = [...new Set(products.map((p) => p.brand))];
      const availableTypes = [...new Set(products.map((p) => p.type))];

      setFilter((prev) => ({
        ...prev,
        brand: prev.brand.filter((b) => availableBrands.includes(b)), // Only keep brands that exist in results
        type: prev.type.filter((t) => availableTypes.includes(t)), // Only keep types that exist in results
      }));
    }
  }, [products]); // Runs whenever products change

  return (
    <FiltersContext.Provider value={{ filter, setFilter, searchQuery, products, debouncedRefetch }}>
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
