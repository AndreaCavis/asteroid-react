import { ProductFilterValidator } from "@/lib/validators/product-validator";
import { connectToDB } from "../mongoDB";
import { NextRequest } from "next/server";

export async function GET() {
  const { db } = await connectToDB();

  try {
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-type": "Application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching product from DB:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDB();
    const body = await req.json();

    console.log("Received filter from frontend:", JSON.stringify(body.filter, null, 2));

    // Correctly parse filter
    const { type, price, brand, sort } = ProductFilterValidator.parse(body.filter);
    const [minPrice, maxPrice] = price; // Extract price range
    const searchQuery = body.searchQuery?.trim(); // Get searchquery and only apply if there's a real query

    if (type.length === 0 || brand.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build MongoDB query object
    const filter: any = {};

    if (type.length > 0) {
      filter.type = { $in: type };
    }

    if (brand.length > 0) {
      filter.brand = { $in: brand };
    }

    filter.price = { $gte: minPrice, $lte: maxPrice }; // Correct price filtering

    if (searchQuery && searchQuery.length > 0) {
      filter.name = { $regex: new RegExp(searchQuery, "i") }; // Case-insensitive search
    }

    // Determine sorting order
    const sortOption: Record<string, 1 | -1> = {};
    if (sort === "price-asc") {
      sortOption.price = 1; // Ascending
    } else if (sort === "price-desc") {
      sortOption.price = -1; // Descending
    }

    // Fetch filtered & sorted products from MongoDB
    const products = await db.collection("products").find(filter).sort(sortOption).limit(25).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
