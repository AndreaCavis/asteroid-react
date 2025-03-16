import { Product } from "../ui/product-data";

// CURRENTLY NOT USED

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    // TO-DO, fix layout by modifying homepage (or results page)

    <div className="group relative">
      {products.map((product) => (
        <div key={product.id}>
          <div className="aspect-square w-1/4 overflow-hidden rounded-md bg-gray-200 lg:aspect-auto group-hover:opacity-75 lg:h-80">
            <img
              src={product.imageUrl}
              alt={product.name + "image"}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">{product.name}</h3>
              <h3 className="text-sm text-gray-700">{product.brand}</h3>
              <p className="mt-1 text-sm text-gray-500">£ {product.price}</p>
            </div>
          </div>
          {/* <p className='text-sm font-medium text-gray-900'>{product.price}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
