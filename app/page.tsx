import Product from "./components/products";
import Searchbar from "./components/searchbar";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return (
    <>
      <h1 className="text-white text-4xl text-center">Welcome to Asteroid!</h1>
      <Searchbar />
      <Product products={products} />
    </>
  );
}
