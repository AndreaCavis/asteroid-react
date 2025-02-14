import { connectToDB } from "../mongoDB"

export async function GET() {

    const { db } = await connectToDB();
    
    // console.log("DB Name:", db.databaseName);  // debug purposes

    try {
    const products = await db.collection("products").find({}).toArray();

    // console.log("THESE ARE THE PRODUCTS: ", products);  // debug purposes

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