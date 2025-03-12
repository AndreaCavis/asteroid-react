import ProductsList from "../components/ui/productsList";
import Searchbar from "../components/ui/searchbar";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return (
    <>
      <h1 className="text-white text-4xl text-center">Welcome to Asteroid!</h1>
      <Searchbar />
      <ProductsList products={products} />
    </>
  );
}
