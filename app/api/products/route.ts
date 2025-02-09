import { connectToDB } from "../mongoDB"

export async function GET() {



        const { db } = await connectToDB();

        const admin = await db.admin();
        const result = await admin.ping();
        console.log("Result: ", result);


    
    try {
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            "Content-type": "Application/json"
        }
    })
} catch (error)
    {
       console.error('Error fetching product from DB:', error);
       return new Response("Internal Server Error", {
           status: 500,
       });}
}