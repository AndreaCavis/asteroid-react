"use client";

import { IoSearch } from "react-icons/io5";
import { Product, products } from "../product-data";
import { ChangeEvent, useState } from "react";

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;

  // Safely escape any regex special characters in the query:
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Build a case-insensitive RegExp capturing the query
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  // Split the text around the matched parts
  const parts = text.split(regex);

  // Map each piece back, wrapping the matched parts in a <span>
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="text-[#EA3680] font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setActiveSearch([]);
      return;
    }

    // Filter by name and limit results to 8
    const filteredProducts = products
      .filter((product) => product.name.toLowerCase().includes(e.target.value))
      .slice(0, 8);

    setActiveSearch(filteredProducts);
  };

  return (
    <div className="flex justify-center">
      <form className="w-2/5 relative">
        <div>
          <input
            type="search"
            placeholder="Search here..."
            className="w-full my-8 p-3 rounded-full bg-transparent text-white search-shadow"
            onChange={(e) => handleSearch(e)}
          />
          <button className="absolute right-0 text-2xl text-[#ff80ab] hover:text-current top-1/2 -translate-y-1/2 p-3 rounded-full">
            <IoSearch />
          </button>
          {activeSearch.length > 0 && (
            <div className="absolute z-50 top-24 pl-4 box-shadow bg-[#0a0a0a] text-white w-full flex flex-col gap-2">
              {activeSearch.map((item) => (
                <span key={item.id} className="hover:bg-stone-900">
                  {" "}
                  {highlightMatch(item.name, searchValue)}{" "}
                </span>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
