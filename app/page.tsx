"use client";

import Searchbar from "../components/Searchbar";
import { useEffect } from "react";
import { RESET_FILTERS, useFilters } from "@/components/FiltersContext";
import ProductCard from "@/components/Products/ProductCard";
import ProductCardSkeleton from "@/components/Products/ProductCardSkeleton";
import EmptyState from "@/components/Products/EmptyState";

export default function Home() {
  const { products, debouncedRefetch, filter, setFilter } = useFilters(); // Get global products, filter, and refetch

  // Call refetch() when the page loads
  useEffect(() => {
    setFilter(RESET_FILTERS); // ✅ Reset filters to default when a new search happens
    debouncedRefetch();
  }, []);

  return (
    <main className="mx-auto max-w-7xl pt-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b-2 border-stone-600 pb-4">
        <h1 className="font-semibold tracking-tight text-accent-foreground lg:text-4xl md:text-3xl sm:text-2xl text-xl ">
          Find the <span className="text-primary underlined">supplements</span> you're looking for
        </h1>
      </div>
      <div className="mx-auto w-1/2">
        <Searchbar />
      </div>

      {/* PRODUCTS grid */}
      <div className="m-4 grid gap-x-4 gap-y-8 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:grid-cols-3 sm:grid-cols-3 grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : filter.brand.length === 0 || filter.type.length === 0 ? (
          <EmptyState name="" />
        ) : (
          Array.from({ length: 12 }, (_, i) => <ProductCardSkeleton key={i} />)
        )}
      </div>
    </main>
  );
}
