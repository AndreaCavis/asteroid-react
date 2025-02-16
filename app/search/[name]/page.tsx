"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFoundPage from "@/app/not-found";
import Searchbar from "@/app/components/searchbar";
import ProductsList from "@/app/components/productsList";

export default function Results() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  // fetching products from db based on query
  useEffect(() => {
    if (!name) return;
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/query/" + name);
        if (response.status === 404) {
          return <NotFoundPage />;
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };
    fetchProducts();
  }, [name]);

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
