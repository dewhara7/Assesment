// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";

// let mongodb:MongoMemoryServer;
// export async function connect(){
//     mongodb=await MongoMemoryServer.create();
//     const uri=mongodb.getUri();
    
//     await mongoose.connect(uri);
// }

// export async function closedb(){
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//    if (mongodb)
//         await mongodb.stop();

// }
import mongoose from "mongoose";

const MONGO_URL =  "mongodb+srv://dewharaabeysinghe:pDjguwKqVzAqfdat@cluster0.b9ebt.mongodb.net/asessment?retryWrites=true&w=majority"; // Replace with your actual database name

export const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error:any) {
    console.error("MongoDB connection error:", error.message);
    throw error; // Propagate the error to the caller
  }
};