"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Searchbar from "../components/ui/searchbar";
import { SORT_OPTIONS } from "../components/ui/sidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ProductList from "@/components/Products/ProductList"; // TO-DO fix layout
import ProductsList from "@/components/ui/product-list";

export default function Home() {
  const [filter, setFilter] = useState({
    type: [],
    sort: "none",
  });

  const [products, setProducts] = useState([]);

  // async function to handle database call in use client
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b-2 border-stone-600 pb-4">
        <h1 className="font-semibold tracking-tight text-white lg:text-4xl md:text-3xl sm:text-2xl text-xl ">
          Find the <span className="text-[#EA3680] underlined">supplements</span> you're looking for
        </h1>
      </div>
      <div className="flex items-center">
        <div className="flex-1 flex justify-center">
          <Searchbar />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="group inline-flex justify-center text-md font-medium text-stone-400 hover:text-white">
            Sort
            <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[#EA3680]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.name}
                className={cn("text-left w-full block px-4 py-2", {
                  "text-white bg-stone-800 rounded": option.value === filter.sort,
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
      <ProductsList products={products} />
    </main>
  );
}
