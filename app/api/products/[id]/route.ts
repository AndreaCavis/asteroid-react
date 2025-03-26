import { connectToDB } from "../../mongoDB";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, {params}: { params: Promise<{id: string}> }) {
    const { db } = await connectToDB();
    
    const resolvedParams = await params; // ✅ Explicitly await params
    const productID = resolvedParams.id; // ✅ Now we can safely use it

    try {
        console.log("Fetching product with ID:", productID);
        const product = await db.collection("products").findOne({ id: productID });

        if (!product) {
            return new Response("Product not found", { status: 404 });
        }
    
        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { "Content-type": "Application/json" }
        });
    } catch (error) {
        console.error("Error fetching product from DB:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
