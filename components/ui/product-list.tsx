import { Product } from "@/lib/validators/product-validator";
import Image from "next/image";
import Link from "next/link";

const ProductSkeleton = () => {
  return (
    <div className="bg-none rounded-md w-52 animate-pulse">
      {/* Image Skeleton */}
      <div className="flex justify-center h-52 w-52 bg-stone-800 rounded-md" />

      {/* Text Skeleton */}
      <div className="w-52 p-2">
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
    <div className="m-4 grid gap-x-4 gap-y-8 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />) // ✅ Show skeletons while loading
        : products.map((product) => (
            <Link
              key={product.id}
              href={"/products/" + product.id}
              className="bg-none rounded-md w-52 hover:opacity-75 transition-transform"
            >
              <div className="flex justify-center h-52 w-52 overflow-hidden">
                <Image
                  src={"/" + product.imageUrl}
                  alt={product.name + " image"}
                  width={208}
                  height={208}
                  className="object-fill rounded-md"
                />
              </div>
              <div className="w-52 p-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <h3 className="text-md text-white font-normal mb-1">{product.brand}</h3>
                <p className="text-md text-[#EA3680] font-semibold">
                  <span className="text-white">£</span> {product.price}
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default ProductsList;
