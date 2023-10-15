"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var auth_js_1 = require("../controllers/auth.js");
var loginUser = auth_js_1.authController.loginUser, signupUser = auth_js_1.authController.signupUser;
var router = express_1.default.Router();
// POST /auth/login
router.post("/login", [
    (0, express_validator_1.body)("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().trim().withMessage("Password is required")
], loginUser);
// POST /auth/signup
router.post("/signup", [
    (0, express_validator_1.body)("first_name").notEmpty().trim().withMessage("First name is required"),
    (0, express_validator_1.body)("last_name").notEmpty().trim().withMessage("Last name is required"),
    (0, express_validator_1.body)("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().trim().isAlphanumeric().withMessage("Password is required")
], signupUser);
// POST /auth/forgot-password
router.post("/forgot_password", [
    (0, express_validator_1.body)("email").notEmpty().trim().isEmail().withMessage("Email is required"),
], signupUser);
// POST /auth/reset-password
router.post("/reset_password", [
    (0, express_validator_1.body)("password").notEmpty().trim().isAlphanumeric().withMessage("Password is required")
], signupUser);
exports.default = router;
