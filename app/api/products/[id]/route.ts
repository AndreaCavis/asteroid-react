import { connectToDB } from "../../mongoDB";
import { NextRequest } from "next/server";

type Params = {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params}) {
    const { db } = await connectToDB();

    const productID = params.id;

    try {

        const product = await db.collection("products").findOne({ id: productID });

        if (!product) {
            return new Response("Product not found", {
                status: 404,
            })
        }
    
        return new Response(JSON.stringify(product), {
            status: 200,
            headers: {
                "Content-type": "Application/json"
            }
        })
    }
    catch (error)
     {
        console.error('Error fetching product from DB:', error);
        return new Response("Internal Server Error", {
            status: 500,
        });

    }
}