import { Product } from "@/lib/validators/product-validator";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      key={product.id}
      href={"/products/" + product.id}
      className="bg-none rounded-md w-52 opacity-75 hover:opacity-100 hover:scale-95 transition-all duration-300 ease"
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
        <h3 className="text-accent-foreground font-normal mb-1">{product.brand}</h3>
        <p className="text-primary font-semibold">
          <span className="text-accent-foreground">£</span> {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
