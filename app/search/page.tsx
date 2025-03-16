"use client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Searchbar from "@/components/ui/searchbar";
import ProductsList from "@/components/ui/product-list";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SORT_OPTIONS } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

// TO-DO: Fix bug that empty searchbar leaves traces of previous search in the page

export default function Results() {
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false); // Track not found state
  const name = useSearchParams().get("query") ?? "";

  const [filter, setFilter] = useState({
    sort: "none",
  });

  // fetching products from db based on query
  useEffect(() => {
    if (!name) return;
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/query?search=${encodeURIComponent(name)}`);
        if (response.status === 404) {
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
              <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[#EA3680]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
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
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="ml-4 text-white text-2xl">
          Sorry, we can't find <span className="text-[#EA3680] text-2xl">{name}</span>
        </h1>
      </main>
    );

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
            <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[#EA3680]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.name}
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
                {option.name}
              </button>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h1 className="text-white text-2xl">
        Results for <span className="text-[#EA3680] text-2xl underlined">{name}</span>
      </h1>

      <ProductsList products={products} />
    </main>
  );
}
