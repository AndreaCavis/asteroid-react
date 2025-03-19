"use client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Searchbar from "@/components/ui/Searchbar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/validators/product-validator";
import { SORT_OPTIONS } from "@/components/FiltersContext";
import ProductCard from "@/components/Products/ProductCard";
import EmptySearchState from "@/components/Products/EmptySearchState";

// TO-DO: Fix bug that empty searchbar leaves traces of previous search in the page

export default function Results() {
  const [products, setProducts] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false); // Track not found state
  const name = useSearchParams().get("query") ?? "";

  const [filter, setFilter] = useState({
    sort: "none",
  });

  // fetching products from db based on query
  useEffect(() => {
    if (!name) {
      setProducts([]); // Clear products when search is empty
      setNotFound(false); // Reset notFound state
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/query?search=${encodeURIComponent(name)}`);
        if (response.status === 404) {
          setProducts([]); // Ensure products is empty when no results
          setNotFound(true);
          return;
        }
        const data = await response.json();
        setProducts(data);
        setNotFound(false);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };
    fetchProducts();
  }, [name]);

  // SEARCHBAR EMPTY
  if (!name)
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex-1 flex justify-center">
            <Searchbar />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-md font-medium text-gray-400 hover:text-white">
              Sort
              <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[var(--primary)]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  className={cn("text-left w-full block px-4 py-2", {
                    "text-white bg-stone-800": option.value === filter.sort,
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
      </main>
    );

  // PRODUCT NOT FOUND
  if (notFound)
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex-1 flex justify-center">
            <Searchbar />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="group inline-flex justify-center text-md font-medium text-gray-400 hover:text-white"
              onClick={() => console.log("dropdown clicked")}
            >
              Sort
              <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[var(--primary)]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  className={cn("text-left w-full block px-4 py-2", {
                    "text-white bg-stone-800": option.value === filter.sort,
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

        <EmptySearchState name={name} />
      </main>
    );

  // PRODUCTS LIST
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <div className="flex-1 flex justify-center">
          <Searchbar />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="group inline-flex justify-center text-md font-medium text-gray-400 hover:text-white"
            onClick={() => console.log("dropdown clicked")}
          >
            Sort
            <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[var(--primary)]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.label}
                className={cn("text-left w-full block px-4 py-2", {
                  "text-white bg-stone-800": option.value === filter.sort,
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

      <h1 className="text-white text-2xl">
        Results for <span className="text-[var(--primary)] text-2xl underlined">{name}</span>
      </h1>
      <div className="block">
        <div className="m-4 grid gap-x-4 gap-y-8 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:grid-cols-3 sm:grid-cols-3 grid-cols-3">
          {products === null
            ? // Show skeletons while loading
              new Array(12).map((_, i) => <ProductSkeleton key={i} />)
            : // Render product cards
              products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </main>
  );
}
