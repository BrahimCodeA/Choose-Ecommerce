import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import cookieParser from "cookie-parser";

// App Config
const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
