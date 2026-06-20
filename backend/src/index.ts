import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import aiRoutes from "./routes/ai.js";
import paymentRoutes from "./routes/payment.js";
import cors from "cors";
import Razorpay from "razorpay";
dotenv.config();

const PORT = process.env.PORT || 5000;
const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:5173";

try {
  await connectDB();
} catch (error) {
  console.error("❌ Failed to connect to database:", error);
  process.exit(1);
}

const app = express();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

app.use(
  cors({
    origin: [BASE_API_URL, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
