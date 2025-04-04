"use client";

import { Product } from "@/lib/validators/product-validator";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const ProductDetails = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <main>
      {/* Back Button */}
      <div className="flex">
        <div
          onClick={() => router.back()}
          className="transition-all duration-300 mt-4 mr-auto ml-12 text-accent-foreground hover:text-primary lg:text-4xl md:text-3xl sm:text-2xl text-xl "
        >
          <FaArrowLeftLong />
        </div>
      </div>

      {/* Product Container */}
      <div className="container mx-auto p-8 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Image Container - prevents squashing */}
        <div className="lg:w-1/2 w-full flex justify-center lg:pr-8">
          <img
            src={"/" + product.imageUrl}
            alt={product.name + " image"}
            className="w-full lg:max-w-md md:max-w-xs sm:max-w-72 h-auto rounded-3xl ring-4 pink-shadow"
            width={400}
            height={400}
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 w-full text-center lg:text-left mt-6 lg:mt-0">
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold mb-4 text-accent-foreground">
            {product.name}
          </h1>
          <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold mb-6">{product.brand}</h2>
          <p className="lg:text-2xl md:text-xl sm:text-lg text-base text-accent-foreground mb-6">£{product.price}</p>
          <h3 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold mb-4">Suggested Use</h3>
          <p className="lg:text-xl md:text-lg sm:text-base text-sm text-accent-foreground">{product.suggested_use}</p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
