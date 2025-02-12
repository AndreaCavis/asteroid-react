import { connectToDB } from "../mongoDB"

export async function GET() {

    const { db } = await connectToDB();
    
    try {
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            "Content-type": "Application/json"
        }
    });
    }
    catch (error) {
       console.error('Error fetching product from DB:', error);
       return new Response("Internal Server Error", {
           status: 500,
       });
    }
}