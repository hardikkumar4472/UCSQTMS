import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  vendorId: { type: String, required: true }, // Vendor ID (link later)
  status: { type: String, enum: ["active", "served", "cancelled", "expired"], default: "active" },
  createdAt: { type: Date, default: Date.now, expires: 120 } // TTL: 2 min
}, { timestamps: true });

export default mongoose.model("Token", tokenSchema);
