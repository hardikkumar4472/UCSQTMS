import Student from "../models/Student.js";
import jwt from "jsonwebtoken";
export const registerStudent = async (req, res) => {
  try {
    const { name, uid, email, phone } = req.body;
    const student = await Student.create({ name, uid, email, phone });
    res.status(201).json({ success: true, student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { uid, email, phone } = req.body;
    const student = await Student.findOne({ uid, email, phone });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
