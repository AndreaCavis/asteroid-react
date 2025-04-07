import { MongoClient, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null;
let cachedDb: any | null;

export async function connectToDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.nfxxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  cachedClient = client;
  cachedDb = client.db("asteroid-DB");

  return { client, db: client.db("asteroid-DB") };
}
