import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Loaded MONGO_URI:", `"${process.env.MONGO_URI}"`);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
};

export default connectDB;
