import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/ai_resume_db";
  try {
    await mongoose.connect(MONGO_URI as string, {
      dbName: "ai-career",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
