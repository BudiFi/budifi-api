"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const { loginUser, signupUser, forgotPassword, resetPassword } = auth_1.authController;
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().trim().withMessage("Password is required"),
], loginUser);
router.post("/signup", [
    (0, express_validator_1.body)("first_name")
        .notEmpty()
        .trim()
        .withMessage("First name is required"),
    (0, express_validator_1.body)("last_name")
        .notEmpty()
        .trim()
        .withMessage("Last name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .trim()
        .isAlphanumeric()
        .withMessage("Password is required"),
], signupUser);
router.post("/forgot_password", [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage("Email is required"),
], forgotPassword);
router.post("/reset_password", [(0, express_validator_1.body)("password").notEmpty().trim().withMessage("Password is required")], resetPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map