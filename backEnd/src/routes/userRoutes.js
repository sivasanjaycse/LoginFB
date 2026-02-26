import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected route: uses verifyToken middleware
router.get("/profile", verifyToken, getUserProfile);

export default router;
