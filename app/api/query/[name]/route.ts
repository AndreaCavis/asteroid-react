import { connectToDB } from "../../mongoDB";
import { NextRequest } from "next/server";

type Params = {
    name: string;
}

export async function GET(request: NextRequest, { params }: { params: Params}){
    const { db } = await connectToDB();

    const productName = params.name;

    try {
        const products = await db.collection("products").find({ name: { $regex: new RegExp(productName, "i")}}).toArray();

        if (!products) {
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