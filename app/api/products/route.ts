import { connectToDB } from "../mongoDB"

export async function GET() {
    const { db } = await connectToDB();
    const products = db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            "Content-type": "Application/json"
        }
    })
}