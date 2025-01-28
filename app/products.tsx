import { products, Product } from "./product-data";
import Image from "next/image";

export default function ProductsList({ products }:{ products: Product[]}) {
    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <Image src={"/" + product.imageUrl} alt={product.name} width={150} height={150} />
                    <h2>{product.name}</h2>
                    <h3>{product.brand}</h3>
                    <p>£{product.price}</p>
                    <br />
                </div>
            ))}
        </div>
    )
}