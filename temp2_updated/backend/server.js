import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "../backend/Routes/studentRoutes.js";
import tokenRoutes from "../backend/Routes/tokenRoutes.js";
import { Server } from "socket.io";
import http from "http";
import { handleSockets } from "./sockets/socketManager.js";

dotenv.config();
connectDB();
const app = express();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "*" }   // allow frontend to connect
});

// this object will contain all the vendorIDs which we will keep on updating using web sockets for real time frontend and backend updates 
const canteens = {};

app.use(express.json());
handleSockets(io, canteens);
app.use("/api/students", studentRoutes);
app.use("/api/tokens", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
