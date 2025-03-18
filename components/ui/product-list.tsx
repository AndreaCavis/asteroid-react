import { Product } from "@/lib/validators/product-validator";
import Image from "next/image";
import Link from "next/link";

const ProductSkeleton = () => {
  return (
    <div className="bg-none rounded-md lg:w-52 md:w-44 sm:w-32 w-24 animate-pulse">
      {/* Image Skeleton */}
      <div className="flex justify-center bg-stone-800 rounded-md lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24" />

      {/* Text Skeleton */}
      <div className="lg:w-52 md:w-44 sm:w-32 w-24 p-2">
        <div className="h-6 bg-stone-800 rounded-md mb-2 w-3/4" />
        <div className="h-4 bg-stone-800 rounded-md mb-1 w-2/3" />
        <div className="h-4 bg-stone-800 rounded-md w-1/2" />
      </div>
    </div>
  );
};

const ProductsList = ({ products }: { products: Product[] | null }) => {
  const isLoading = !products || products.length === 0; // ✅ Handle empty state

  return (
    <div className="m-4 grid gap-x-4 gap-y-8 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:grid-cols-3 sm:grid-cols-3 grid-cols-3">
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />) // ✅ Show skeletons while loading
        : products.map((product) => (
            <Link
              key={product.id}
              href={"/products/" + product.id}
              className="bg-none rounded-md w-52 hover:opacity-75 transition-transform"
            >
              <div className="flex justify-center lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24 overflow-hidden">
                <Image
                  src={"/" + product.imageUrl}
                  alt={product.name + " image"}
                  width={208}
                  height={208}
                  className="object-fill rounded-md lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24"
                />
              </div>
              <div className="p-2 lg:w-52 md:w-44 sm:w-32 w-24 lg:text-lg md:text-base sm:text-sm text-xs">
                <h2 className="lg:text-xl md:text-lg sm:text-base text-sm font-semibold">{product.name}</h2>
                <h3 className="text-[var(--accent-foreground)] font-normal mb-1">{product.brand}</h3>
                <p className="text-[#EA3680] font-semibold">
                  <span className="text-[var(--accent-foreground)]">£</span> {product.price}
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default ProductsList;
