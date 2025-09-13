import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "../backend/Routes/studentRoutes.js";
import tokenRoutes from "../backend/Routes/tokenRoutes.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/tokens", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
