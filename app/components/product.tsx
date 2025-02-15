import { Product } from "../product-data";
import Image from "next/image";
import Link from "next/link";

export default function Products({ products }: { products: Product[] }) {
  return (
    <div className="m-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={"/products/" + product.id}
          className="bg-none p-2 rounded-lg product-box w-48 md:w-52 lg:w-56 hover:scale-105"
        >
          <div className="flex justify-center mb-2 h-36 w-full relative">
            <Image
              src={"/" + product.imageUrl}
              alt={product.name + " image"}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
          <h3 className="text-md text-white font-medium mb-1">{product.brand}</h3>
          <p className="text-md text-white font-semibold">£{product.price}</p>
        </Link>
      ))}
    </div>
  );
}
