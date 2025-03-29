import { connectToDB } from "../mongoDB";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest){
    const { db } = await connectToDB();

    const searchParams = request.nextUrl.searchParams;
    const searchQuery = searchParams.get("search");

    // const productName = params.name;

    try {
        // searchQuery || "" because RegExp does not accept null value
        const products = await db.collection("products").find({ name: { $regex: new RegExp(searchQuery || "", "i")}}).toArray();

        if (products.length === 0) { // !product is wrong as find will return an empty array if nothing is found
            return new Response("Product not found", {
                status: 404,
            })
        }
    
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-type": "Application/json"
            }
        })
    }
    catch (error) {
        console.error('Error fetching products from DB:', error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}