import { connectToDB } from "../utils/mongoDB";
import { NextRequest } from "next/server";
import { Collection } from "mongodb";
import { Product } from "@/lib/validators/product-validator";

export async function GET(request: NextRequest) {
  const { db } = await connectToDB();
  const productsCollection = db.collection("products") as Collection<Product>;

  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("search");

  try {
    // searchQuery || "" because RegExp does not accept null value
    const products = await productsCollection.find({ name: { $regex: new RegExp(searchQuery || "", "i") } }).toArray();

    if (products.length === 0) {
      // !product is wrong as find will return an empty array if nothing is found
      return new Response("Product not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-type": "Application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products from DB:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
