import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "../types";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import { forgotPasswordContent } from "../templates";
import { sendEmail } from "../utils";

import UserModel from "../models/users";

const SECRET = process.env.SECRET_KEY ?? "";
const cryptr = new Cryptr(SECRET, {
	encoding: "base64",
	saltLength: 10,
});

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
			const hashedPassword = await bcrypt.hash(password, 10);

			if (hashedPassword) {
				await new UserModel({
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
		} else {
			res.status(400).json({
				message: "User with email already exists",
			});
		}
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const err: ResponseError = new Error("Input required fields");
		err.status = 400;
		throw err;
	}
	try {
		const result = await UserModel.findOne({ email: email }).exec();
		if (!result) {
			return res.status(404).json({
				message: "User with email not found",
			});
		}
		const authPassword = await bcrypt.compare(password, result.password);
		if (!authPassword) {
			return res.status(400).json({
				message: "Invalid login details",
			});
		}
		const token = JWT.sign(
			{
				email: result.email,
				userId: result._id.toString(),
			},
			SECRET,
			{ expiresIn: "7d" }
		);
		res.status(201).json({
			message: "User logged in successfully!",
			data: {
				token,
				userId: result._id.toString(),
			},
		});
	} catch (error) {
		const err: ResponseError = new Error(error);
		err.status = 500;
		return next(err);
	}
};

const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;
	const user = await UserModel.findOne({ email }).exec();
	if (!user) {
		return res.status(200).json({
			message:
				"If user exists reset email would be sent to your email address",
		});
	}
	const encryptedToken = cryptr.encrypt(user._id.toString());
	sendEmail(
		user.email,
		user.first_name,
		"Forgot Password",
		"BudiFi",
		"support@budifi.com",
		forgotPasswordContent(encryptedToken)
	);
	res.status(201).json({
		message: "Reset link sent successfully!",
	});
};

export const authController = {
	loginUser,
	signupUser,
	forgotPassword,
};
