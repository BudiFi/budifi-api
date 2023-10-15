var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/users.js";
const HASH_KEY = process.env.SECRET_KEY || "";
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("Input required fields");
        err.statusCode = 400;
        throw err;
    }
    try {
        const result = UserModel.findOne({ email: email });
        if (!result) {
            res.status(404).json({
                message: "User with email not found",
            });
        }
        // UserModel.
    }
    catch (error) {
        const err = new Error(error);
        err.statusCode = 500;
        return next(err);
    }
});
const signupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, first_name, last_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("Validation failed, input required fields");
        err.statusCode = 422;
        err.message = errors.array();
        throw err;
    }
    try {
        const findUserByEmail = yield UserModel.findOne({ email: email });
        if (!findUserByEmail) {
            const hashedPassword = yield bcrypt.hash(password, HASH_KEY);
            if (hashedPassword) {
                const newUser = yield new UserModel({
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                }).save();
                res.status(201).json({
                    message: "User signed up successfully",
                    data: {},
                });
            }
        }
        res.status(400).json({
            message: "User with email already exists",
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
const forgotPassword = (req, res, next) => {
    const { email } = req.body;
};
const resetPassword = (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
};
export const authController = {
    loginUser,
    signupUser,
};
