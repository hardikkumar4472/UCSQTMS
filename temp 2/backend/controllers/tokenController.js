import Token from "../models/Token.js";
export const createToken = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const studentId = req.user.id;
    const existing = await Token.findOne({ studentId, vendorId, status: "active" });
    if (existing) {
      return res.status(400).json({ success: false, message: "Active token already exists for this vendor" });
    }
    const token = await Token.create({ studentId, vendorId });
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const cancelToken = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const token = await Token.findOneAndUpdate(
      { _id: tokenId, studentId: req.user.id },
      { status: "cancelled" },
      { new: true }
    );
    if (!token) {
      return res.status(404).json({ success: false, message: "Token not found" });
    }
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
