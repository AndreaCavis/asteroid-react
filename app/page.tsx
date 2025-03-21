"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RESET_FILTERS, SORT_OPTIONS, useFilters } from "@/components/FiltersContext";
import ProductCard from "@/components/Products/ProductCard";
import EmptyState from "@/components/Products/EmptyState";

export default function Home() {
  const { products, debouncedRefetch, filter, setFilter } = useFilters(); // Get global products, filter, and refetch

  // Call refetch() when the page loads
  useEffect(() => {
    setFilter(RESET_FILTERS); // ✅ Reset filters to default when a new search happens
    debouncedRefetch();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b-2 border-stone-600 pb-4">
        <h1 className="font-semibold tracking-tight text-[var(--accent-foreground)] lg:text-4xl md:text-3xl sm:text-2xl text-xl ">
          Find the <span className="text-[var(--primary)] underlined">supplements</span> you're looking for
        </h1>
      </div>
      <div className="flex items-center">
        <div className="flex-1 flex justify-center">
          <Searchbar />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="group inline-flex justify-center text-md font-medium text-stone-400 hover:text-[var(--accent-foreground)]">
            Sort
            <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[var(--primary)]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.label}
                className={cn("text-left w-full block px-4 py-2", {
                  "text-[var(--accent-foreground)] bg-stone-800 rounded": option.value === filter.sort,
                  "text-gray-400": option.value !== filter.sort,
                })}
                onClick={() => {
                  setFilter((prev) => ({
                    ...prev,
                    sort: option.value,
                  }));
                }}
              >
                {option.label}
              </button>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* PRODUCTS grid */}
      <div className="m-4 grid gap-x-4 gap-y-8 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:grid-cols-3 sm:grid-cols-3 grid-cols-3">
        {products && products.length === 0 ? (
          <EmptyState />
        ) : products ? ( // Show skeletons while loading
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          // Render product cards
          new Array(12).map((_, i) => <ProductSkeleton key={i} />)
        )}
      </div>
    </main>
  );
}
