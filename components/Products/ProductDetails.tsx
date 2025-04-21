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
          className="lg:text-4xl md:text-3xl sm:text-2xl text-xl ml-12 mr-auto mt-4
                     transition-all duration-300 text-accent-foreground hover:text-primary"
        >
          <FaArrowLeftLong />
        </div>
      </div>

      {/* Product Container */}
      <div className="container flex flex-col mx-auto mt-0 lg:flex-row items-center lg:items-center">
        {/* Image Container - prevents squashing */}
        <div
          className="flex scale-90 hover:scale-95 transition-all duration-300
                     lg:w-1/2 w-full justify-center"
        >
          <div className="rounded-lg bg-gradient-to-tr from-stone-100/90 via-stone-600/70 to-stone-950">
            <img
              src={"/" + product.imageUrl}
              alt={product.name + " image"}
              className="flex w-full lg:max-w-md md:max-w-xs sm:max-w-72 h-[400px]
                       rounded-lg opacity-50 transition-all duration-300 ease justify-center align-middle
                       bg-gradient-to-tr from-stone-100/90 via-stone-600/70 to-stone-950
                       hover:rounded-md hover:opacity-60"
              width={50}
              height={50}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="group rounded-sm lg:w-1/2 w-full text-center lg:text-left mt-6 pt-6 pr-2 lg:mt-0">
          <h1
            className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl
                       font-bold mb-4 text-accent-foreground opacity-80
                       hover:opacity-100 transition-all duration-700
                       group-hover:text-stone-100 group-hover:opacity-90"
          >
            {product.name}
          </h1>
          <h2
            className="lg:text-3xl md:text-2xl sm:text-xl text-lg
                       font-bold mb-6 opacity-80
                       hover:opacity-100 transition-all duration-700
                       hover:text-ellipsis hover:text-transparent group-hover:text-bluesky-light"
          >
            {product.brand}
          </h2>
          <p
            className="lg:text-2xl md:text-xl sm:text-lg text-base
                       text-accent-foreground mb-6 opacity-80
                       hover:opacity-100 transition-all duration-700
                       group-hover:text-stone-400 group-hover:opacity-100"
          >
            £{product.price}
          </p>
          <h3
            className="lg:text-3xl md:text-2xl sm:text-xl text-lg
                       font-semibold mb-4 opacity-80
                       hover:opacity-100 transition-all duration-700
                       hover:text-ellipsis hover:text-transparent group-hover:text-bluesky-light"
          >
            Suggested Use
          </h3>
          <p
            className="lg:text-xl md:text-lg sm:text-base text-sm
                       text-accent-foreground opacity-80
                       hover:opacity-100 transition-all duration-700
                       group-hover:text-stone-400 group-hover:opacity-100"
          >
            {product.suggested_use}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
