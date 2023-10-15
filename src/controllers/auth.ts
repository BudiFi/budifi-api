import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/users";
import { ResponseError } from "../types";

const HASH_KEY = process.env.SECRET_KEY || "";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const err: ResponseError = new Error("Input required fields");
		err.status = 400;
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
	} catch (error) {
		const err: ResponseError = new Error(error);
		err.status = 500;
		return next(err);
	}
};

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password, first_name, last_name } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const err: ResponseError = new Error(
			"Validation failed, input required fields"
		);
		err.status = 422;
		throw err;
	}

	try {
		const findUserByEmail = await UserModel.findOne({ email: email });
		if (!findUserByEmail) {
			const hashedPassword = await bcrypt.hash(password, HASH_KEY);

			if (hashedPassword) {
				await new UserModel({
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
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}

		next(err);
	}
};

export const authController = {
	loginUser,
	signupUser,
};
