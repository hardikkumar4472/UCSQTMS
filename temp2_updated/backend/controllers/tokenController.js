import Token from "../models/Token.js";
import { io } from '../server.js';
export const createToken = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const studentId = req.user.id;
    const { orders } = req.body;
    const existing = await Token.findOne({ studentId, vendorId, status: "active" });
    if (existing) {
      return res.status(400).json({ success: false, message: "Active token already exists for this vendor" });
    }
    const token = await Token.create({ studentId, vendorId });
    // adding to queue 
    const entry = { token: token._id, vendorId, studentId, orders }
    canteens[vendorId].queue.push(entry);
    // updating using web sockets 
    io.to(vendorId).emit("queueUpdate", canteens[vendorId].queue);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const cancelToken = async (req, res) => {
  try {
    const { tokenId, vendorId } = req.params;
    const token = await Token.findOneAndUpdate(
      { _id: tokenId, studentId: req.user.id },
      { status: "cancelled" },
      { new: true }
    );
    if (!token) {
      return res.status(404).json({ success: false, message: "Token not found" });
    }

    const index = canteens[vendorId].queue.findIndex(e => e.token.toString() === tokenId);
    if (index !== -1) canteens[vendorId].queue.splice(index, 1);
    // updating queue using web sockets 
    io.to(vendorId).emit("queueUpdate", canteens[vendorId].queue);

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyTokens = async (req, res) => {
  try {
    const tokens = await Token.find({ studentId: req.user.id, status: "active" }).sort({ createdAt: 1 });
    res.json({ success: true, tokens });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
