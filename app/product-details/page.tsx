import ProductsList from "../products"
import { products } from "../product-data"

export default function ProductDetailsPage() {
    return (
        <>
        <h1>Products List</h1>
        <br />
        <ProductsList products={products}/>
        <br />
        </>
    )
}