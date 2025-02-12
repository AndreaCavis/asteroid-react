import Product from "./products";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
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
