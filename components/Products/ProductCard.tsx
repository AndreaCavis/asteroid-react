import { Product } from "@/lib/validators/product-validator";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link key={product.id} href={"/products/" + product.id} className="group bg-none rounded-md w-52 ">
      <div className="flex justify-center lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24 overflow-hidden">
        <Image
          src={"/" + product.imageUrl}
          alt={product.name + " image"}
          width={208}
          height={208}
          className="object-fill rounded-md lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24
          group-hover:opacity-100 scale-90 opacity-75 group-hover:scale-100 transition-all duration-300 ease"
        />
      </div>

      <div className="group-hover:opacity-100">
        <div className="p-2 lg:w-52 md:w-44 sm:w-32 w-24 lg:text-lg md:text-base sm:text-sm text-xs">
          <h2
            className="animated-text transition-opacity duration-200 opacity-75 group-hover:opacity-100 
          lg:text-xl md:text-lg sm:text-base text-sm font-semibold"
          >
            {product.name}
          </h2>
          <h3 className="transition-all duration-200 opacity-75 group-hover:opacity-100 text-accent-foreground font-normal mb-1">
            {product.brand}
          </h3>
          <p className="text-accent-foreground font-semibold opacity-75 transition-all duration-0 group-hover:opacity-100">
            £ <span className="text-primary">{product.price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
