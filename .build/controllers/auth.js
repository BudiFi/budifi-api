"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_validator_1 = require("express-validator");
const templates_1 = require("../templates");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cryptr_1 = __importDefault(require("cryptr"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("../models/users"));
const SECRET = process.env.SECRET_KEY ?? "";
const cryptr = new cryptr_1.default(SECRET, {
    encoding: "base64",
    saltLength: 10,
});
const signupUser = async (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new Error("Validation failed, input required fields");
        err.status = 422;
        throw err;
    }
    try {
        const findUserByEmail = await users_1.default.findOne({ email: email });
        if (!findUserByEmail) {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            if (hashedPassword) {
                await new users_1.default({
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                }).save();
                return res.status(201).json({
                    message: "User signed up successfully",
                    data: {
                        first_name,
                        last_name,
                        email,
                    },
                });
            }
        }
        else {
            res.status(400).json({
                message: "User with email already exists",
            });
        }
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new Error("Input required fields");
        err.status = 400;
        throw err;
    }
    try {
        const result = await users_1.default.findOne({ email: email }).exec();
        if (!result) {
            return res.status(404).json({
                message: "User with email not found",
            });
        }
        const authPassword = await bcrypt_1.default.compare(password, result.password);
        if (!authPassword) {
            return res.status(400).json({
                message: "Invalid login details",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            email: result.email,
            userId: result._id.toString(),
        }, SECRET, { expiresIn: "7d" });
        res.status(201).json({
            message: "User logged in successfully!",
            data: {
                token,
                userId: result._id.toString(),
            },
        });
    }
    catch (error) {
        const err = new Error(error);
        err.status = 500;
        return next(err);
    }
};
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new Error("Input required fields");
        err.status = 400;
        throw err;
    }
    try {
        const user = await users_1.default.findOne({ email }).exec();
        if (!user) {
            return res.status(200).json({
                message: "If user exists reset email would be sent to your email address",
            });
        }
        const userId = user._id.toString();
        const encryptedToken = cryptr.encrypt(userId);
        (0, utils_1.sendEmail)(user.email, user.first_name, "Forgot Password", "BudiFi", "support@budifi.com", (0, templates_1.forgotPasswordContent)(encryptedToken));
        res.status(201).json({
            message: "Reset link sent successfully!",
        });
    }
    catch (error) {
        const err = new Error(error);
        err.status = 500;
        return next(err);
    }
};
const resetPassword = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const { token } = req.query;
    const { password } = req.body;
    if (!errors.isEmpty()) {
        const err = new Error("Input required fields");
        err.status = 400;
        throw err;
    }
    if (token) {
        const decryptedToken = cryptr.decrypt(token);
        const userId = new mongoose_1.default.Types.ObjectId(decryptedToken);
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            await users_1.default.findOneAndUpdate(userId, {
                password: hashedPassword,
            });
            res.status(201).json({
                message: "Password updated successfully!",
            });
        }
        catch (error) {
            const err = new Error(error);
            err.status = 500;
            return next(err);
        }
    }
    else {
        res.status(400).json({
            message: "Invalid token",
        });
    }
};
exports.authController = {
    loginUser,
    signupUser,
    forgotPassword,
    resetPassword,
};
//# sourceMappingURL=auth.js.map