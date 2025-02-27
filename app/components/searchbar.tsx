"use client";
import { IoSearch } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// Function to highlight typed letters in suggestions
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  // Safely escape any regex special characters in the query:
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi"); // gi stand for case insensitive
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
  const [activeSearch, setActiveSearch] = useState<string[]>([]);
  const [allProductNames, setAllProductNames] = useState<string[]>([]); // Store all product names
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // Arrow navigation suggestion menu
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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

  // Ensure selectedIndex is within bounds when activeSearch updates
  useEffect(() => {
    if (selectedIndex >= activeSearch.length) {
      setSelectedIndex(activeSearch.length - 1);
    }
  }, [activeSearch]);

  // Call this before handle search to prevent conflict with debounce callback
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearch(e);
  };

  // debounced search function
  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, 300); // 300ms is the debounce time for the handleSearch function

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
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(activeSearch[selectedIndex]);
    }
  };

  // Performs the search and goes to the result page
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    // Navigate to the results page
    // router.push(`/search/?query=${encodeURIComponent(searchValue)}`);
    const params = new URLSearchParams();
    params.set("query", searchValue);
    router.push(`/search/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center">
      <form className="w-2/5 relative">
        <div>
          <input
            type="search"
            placeholder="Search here..."
            ref={inputRef}
            className="w-full my-8 p-3 rounded-full bg-transparent text-white search-shadow"
            value={searchValue || ""} // searchValue || "" so that is always a string
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown} // Listen to keydown event
          />
          <button
            className="absolute right-0 text-2xl text-[#ff80ab] hover:text-current top-1/2 -translate-y-1/2 p-3 rounded-full"
            onClick={(e) => handleSearchSubmit(e)}
          >
            <IoSearch />
          </button>
          {activeSearch.length > 0 && (
            <div className="absolute z-50 top-24 box-shadow bg-[#0a0a0a] rounded-md text-white w-full flex flex-col gap-2">
              {activeSearch.map((item, index) => (
                <span
                  key={index}
                  className={`hover:bg-stone-800 rounded-md pl-4  ${index === selectedIndex ? "bg-stone-800" : ""}`}
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
}
