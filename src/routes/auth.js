import express from "express";
import { body } from 'express-validator';
import { authController } from '../controllers/auth.js';
const { loginUser, signupUser } = authController;

const router = express.Router();

// POST /auth/login
router.post("/login", [
	body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
	body("password").notEmpty().trim().withMessage("Password is required")
], loginUser);

// POST /auth/signup
router.post("/signup", [
	body("first_name").notEmpty().trim().withMessage("First name is required"),
	body("last_name").notEmpty().trim().withMessage("Last name is required"),
	body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
	body("password").notEmpty().trim().isAlphanumeric().withMessage("Password is required")
], signupUser
)
// POST /auth/forgot-password
router.post("/forgot_password", [
	body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
], signupUser
)
// POST /auth/reset-password
router.post("/reset_password", [
	body("password").notEmpty().trim().isAlphanumeric().withMessage("Password is required")
], signupUser
)

export default router;

