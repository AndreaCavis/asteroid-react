import { Product } from "@/lib/validators/product-validator";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link key={product.id} href={"/products/" + product.id} className="group bg-none rounded-md w-52">
      <div
        className="flex justify-center lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24 overflow-hidden
                   rounded-lg scale-90 transition-all duration-300 ease-out
                   group-hover:bg-gradient-to-tr group-hover:from-stone-100/90 group-hover:via-stone-600/70 group-hover:to-stone-950
                   after:group-hover:bg-gradient-to-tl after:group-hover:from-stone-300/90 after:group-hover:via-stone-600/20
                   group-hover:rounded-md group-hover:scale-100"
      >
        <Image
          src={"/" + product.imageUrl}
          alt={product.name + " image"}
          width={208}
          height={208}
          className="object-fill lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24
                     transition-all ease-out duration-300
                     border-y-0 border-transparent
                     group-hover:border-y-4 group-hover:border-background group-hover:border-opacity-60
                     opacity-60 scale-100 rounded-md 
                     group-hover:opacity-50 group-hover:scale-100"
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
