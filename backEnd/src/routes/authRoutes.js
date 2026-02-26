import express from "express";
import {
  registerUser,
  getEmailByUsername,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/username/:username", getEmailByUsername);

export default router;
