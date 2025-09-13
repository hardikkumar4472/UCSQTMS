import express from "express";
import { createToken, cancelToken, getMyTokens } from "../controllers/tokenController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createToken);
router.put("/cancel/:tokenId", protect, cancelToken);
router.get("/my-tokens", protect, getMyTokens);

export default router;
