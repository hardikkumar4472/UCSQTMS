import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
