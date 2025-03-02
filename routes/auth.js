// routes/auth.js
import { register, loginUser } from "../controllers/auth.js";  // Match the export names
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);  // Example login route

export default router;
