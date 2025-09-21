import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import artisanRoutes from "./routes/artisans.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/artisans", artisanRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo connection error:", err));
