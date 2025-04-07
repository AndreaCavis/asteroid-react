"use client";

import { IoSearch } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState<string[]>([]);
  const [allProductNames, setAllProductNames] = useState<string[]>([]); // Store all product names
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // Arrow navigation suggestion menu
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Function to highlight typed letters in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    // Safely escape any regex special characters in the query:
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi"); // gi stand for case insensitive
    // Split the text around the matched parts
    const parts = text.split(regex);

    // Map each piece back, wrapping the matched parts in a <span>
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="text-primary font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // API call for productNames for suggestion menu only once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/query?search=");
        const data = await response.json();
        setAllProductNames(data.map((product: any) => product.name)); // Store names only
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Call this before handle search to prevent conflict with debounce callback
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedHandleSearch(e);
  };

  // debounced search function
  const debouncedHandleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const query = e.target.value;
    setSearchValue(query);
    query ? params.set("query", query) : params.delete("query"); // Set the query parameter to the search text
    router.replace(`${pathname}?${params.toString()}`); // Update the URL with the new query parameter
    if (!query) {
      setActiveSearch([]);
      return;
    }

    // Filter by name and limit results to 8
    const filteredProducts = allProductNames
      .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
    setActiveSearch(filteredProducts);
    setSelectedIndex(-1); // Reset selection when typing
  }, 300);

  // Function to handle clicking on a suggestion
  const handleSuggestionClick = (productName: string) => {
    setSearchValue(productName); // Set the clicked suggestion in the search input
    setActiveSearch([]); // Clear the suggestions
    // Update the query in the URL with the clicked product name
    const params = new URLSearchParams(searchParams);
    params.set("query", productName);
    router.replace(`${pathname}?${params.toString()}`);
    if (inputRef.current) {
      inputRef.current.focus(); // Keeps focus on searchbar
    }
  };

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent page scrolling
      setSelectedIndex((prevIndex) => (prevIndex < activeSearch.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent page scrolling
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0 && activeSearch.length > 0) {
        // User pressed Enter on a dropdown suggestion
        handleSuggestionClick(activeSearch[selectedIndex]);
      } else {
        // User pressed Enter normally -> Perform search
        debouncedHandleSearchSubmit(e);
      }

      setActiveSearch([]); // Close dropdown
    } else if (e.key === "Escape") {
      setActiveSearch([]); // Close dropdown but keep text
    }
  };

  // Performs the search and goes to the result page
  const debouncedHandleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    // Navigate to the results page
    const params = new URLSearchParams();
    params.set("query", searchValue);
    console.log("✅ Navigating to:", `/search/?${params.toString()}`);
    router.push(`/search/?${params.toString()}`);

    setActiveSearch([]); // Close dropdown but keep search text
  };

  // Ensure selectedIndex is within bounds when activeSearch updates
  useEffect(() => {
    if (selectedIndex >= activeSearch.length && activeSearch.length > 0) {
      setSelectedIndex(activeSearch.length - 1);
    }
  }, [activeSearch]);

  return (
    <div className="flex justify-center w-1/2 ">
      <form className="flex-none relative w-full">
        <div>
          <input
            type="search"
            placeholder="Search for supplements..."
            ref={inputRef}
            className="search-shadow w-full my-8 p-3 rounded-full bg-transparent text-accent-foreground"
            value={searchValue || ""} // searchValue || "" so that is always a string
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown} // Listen to keydown event
            onBlur={() => {
              setTimeout(() => {
                if (activeSearch) {
                  setActiveSearch([]);
                }
              }, 100); // delay to let the onClick function in the suggestion menu to be triggered
            }}
          />
          <button
            className="transition-all duration-300 absolute right-0 text-2xl text-primary opacity-75 hover:opacity-100 top-1/2 -translate-y-1/2 p-3 rounded-full"
            onClick={(e) => debouncedHandleSearchSubmit(e)}
          >
            <IoSearch />
          </button>
          {activeSearch.length > 0 && (
            <div className="absolute z-50 top-24 bg-black rounded-md text-accent-foreground w-full flex flex-col gap-2">
              {activeSearch.map((item, index) => (
                <span
                  key={index}
                  className={cn("hover:bg-stone-800 rounded-md pl-4", {
                    "bg-stone-800": index === selectedIndex,
                  })}
                  onClick={() => handleSuggestionClick(item)}
                >
                  {highlightMatch(item, searchValue)}
                </span>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
