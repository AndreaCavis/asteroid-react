"use client";

import Searchbar from "@/components/Searchbar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RESET_FILTERS, useFilters } from "@/app/contexts/FiltersContext";
import ProductCard from "@/components/Products/ProductCard";
import EmptyState from "@/components/Products/EmptyState";
import ProductCardSkeleton from "@/components/Products/ProductCardSkeleton";

export const dynamic = "force-dynamic";

export default function Results() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || ""; // Extract search query

  const { products, debouncedRefetch, setFilter, filter } = useFilters(); // Use global filters

  // Apply search query to filters when page loads
  useEffect(() => {
    setFilter(RESET_FILTERS); // ✅ Reset filters to default when a new search happens
    debouncedRefetch(); // Fetch updated results
  }, [searchQuery]);

  return (
    <main className="mx-auto pt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-1/2">
        <Searchbar />
      </div>

      {searchQuery && products.length > 0 ? (
        <h1 className="text-white text-2xl">
          Results for <span className="text-primary text-2xl underlined">{searchQuery}</span>
        </h1>
      ) : null}

      {!searchQuery ? null : products && products.length === 0 ? (
        <div className="flex justify-center">
          <EmptyState name={searchQuery} />
        </div>
      ) : (
        <div className="block">
          <div className="m-4 grid gap-x-4 gap-y-8 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:grid-cols-3 sm:grid-cols-3 grid-cols-3">
            {!products
              ? new Array(12).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      )}
    </main>
  );
}
