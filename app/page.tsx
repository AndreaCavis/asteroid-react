import Product from "./products";
import { products } from "./product-data";
import Products from "./products";

export default function Home() {
  return (
    <>
      <h1>Welcome to Asteroid</h1>
      <br />
      <h1>Products List</h1>
      <br />
      <Product products={products} />
    </>
  );
}
