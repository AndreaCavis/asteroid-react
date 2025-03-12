"use client";
import NotFoundPage from "@/app/not-found";
import Searchbar from "@/components/ui/searchbar";
import ProductsList from "@/components/ui/productsList";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Results() {
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false); // Track not found state
  const name = useSearchParams().get("query") ?? "";

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
      <>
        <h1 className="text-white text-4xl text-center">
          Results for <span className="text-[#EA3680] text-4xl">{name}</span>{" "}
        </h1>
        <Searchbar />
        <h1 className="ml-4 text-white text-2xl">
          <span className="text-[#EA3680] text-2xl">Sorry</span>, we don't have what you're looking for
        </h1>
      </>
    );

  return (
    <>
      <h1 className="text-white text-4xl text-center">
        Results for <span className="text-[#EA3680] text-4xl">{name}</span>{" "}
      </h1>
      <Searchbar />
      <ProductsList products={products} />
    </>
  );
}
