"use client";

import NotFoundPage from "@/app/not-found";
import { useParams, useRouter } from "next/navigation"; // use-client only
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import React from "react";
import { Product } from "@/components/ui/product-data";

export default function ProductDetailsPage() {
  //{ params }: { params: { id: string } } removed for useParams()
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.id) return; // prevent database call if no id is present

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${params.id}`);

        if (response.status === 404) {
          setError(true);
          return;
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (error) return <NotFoundPage />;
  if (!product) return <p className="p-4">Loading...</p>; // loading section, to be modified

  return (
    <>
      <div className="flex">
        <div
          onClick={() => router.back()}
          className="mt-4 mr-auto ml-12 text-white text-4xl hover:text-current hover:scale-105 duration-300"
        >
          <FaArrowLeftLong />
        </div>
      </div>
      <div className="container mx-auto p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center md:mr-8">
          <img
            src={"/" + product.imageUrl}
            alt={product.name + " image"}
            className="w-4/6 h-auto rounded-3xl ring-4 pink-shadow"
            width={400}
            height={400}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">{product.brand}</h1>
          <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
          <p className="text-2xl text-white mb-8">${product.price}</p>
          <h3 className="text-3xl font-semibold mb-4">Suggested Use</h3>
          <p className="text-2xl text-white">{product.suggested_use}</p>
        </div>
      </div>
    </>
  );
}
