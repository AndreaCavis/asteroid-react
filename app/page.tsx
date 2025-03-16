import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import ProductsList from "../components/ui/productsList";
import Searchbar from "../components/ui/searchbar";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b-2 border-stone-600 pb-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Find the <span className="text-[#EA3680] underlined">supplement</span> you're looking for
        </h1>
      </div>

      <div className="flex items-center">
        <div className="flex-1 flex justify-center">
          <Searchbar />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="group inline-flex justify-center text-md font-medium text-gray-400 hover:text-white">
            Sort
            <ChevronDown className="-mr-1 ml-1 w-5 font-extrabold flex-shrink-0 text-[#ff80ab] group-hover:text-[#EA3680]" />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <ProductsList products={products} />
    </main>
  );
}
