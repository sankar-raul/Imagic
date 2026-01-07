import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("mongodb connected successfully ✅");
  } catch (error) {
    console.error(`Mongodb connected error : ${error.message}`);
    process.exit(1);
  }
};






export default connectDB;