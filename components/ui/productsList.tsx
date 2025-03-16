import { Product } from "./product-data";
import Image from "next/image";
import Link from "next/link";

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="m-4 grid gap-x-4 gap-y-8 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
      {products.map((product) => (
        <Link
          key={product.id}
          href={"/products/" + product.id}
          className="bg-none rounded-md w-52 hover:opacity-75 transition-transform" // removed shadow and scale
          // className="flex hover:scale-105 duration-300"
        >
          <div className="flex justify-center h-52 w-52 overflow-hidden">
            <Image
              src={"/" + product.imageUrl}
              alt={product.name + " image"}
              width={208}
              height={208}
              // sizes="max-width: 700px, max-height: 700px"
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
