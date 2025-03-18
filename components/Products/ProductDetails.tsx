"use client";

import { Product } from "@/lib/validators/product-validator";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const ProductDetails = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex">
        <div
          onClick={() => router.back()}
          className="mt-4 mr-auto ml-12 text-[var(--accent-foreground)] text-4xl hover:text-current hover:scale-105 duration-300"
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
          <p className="text-2xl text-[var(--accent-foreground)] mb-8">${product.price}</p>
          <h3 className="text-3xl font-semibold mb-4">Suggested Use</h3>
          <p className="text-2xl text-[var(--accent-foreground)]">{product.suggested_use}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
