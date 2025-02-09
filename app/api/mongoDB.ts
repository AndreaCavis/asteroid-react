import { MongoClient, ServerApiVersion } from 'mongodb';

// let cachedClient: MongoClient | null = null;
// let cachedDb: any | null = null;

// export async function connectToDB() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb}
//   }

//   const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.nfxxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  
//   // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//   const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });

//   await client.connect();

//   cachedClient = client;
//   cachedDb = client.db();

//   return { client, db: client.db() }
// }

export async function connectToDB() {
  
const uri = "mongodb+srv://Andrea:CNhYZsWuYyST2yIf@cluster0.nfxxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
return {client, db: client.db()}}

