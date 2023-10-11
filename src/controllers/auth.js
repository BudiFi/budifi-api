import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import UserModel from '../models/users.js';

const loginUser = async (req, res, next) => {
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
				message: "User with email not found"
			})
		}
		// UserModel.

	} catch (error) {
		const err = new Error(error);
		err.statusCode = 500;
		return next(err);
	}
}

const signupUser = async (req, res, next) => {
	const { email, password, first_name, last_name } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const err = new Error("Validation failed, input required fields")
		err.statusCode = 422;
		err.message = errors.array();
		throw err;
	}

	try {
		const findUserByEmail = await UserModel.findOne({ email: email });

		if (!findUserByEmail) {
			bcrypt.hash((hashedPassword) => {
				if (hashedPassword) {
					return new UserModel({ first_name, last_name, email, password: hashedPassword }).save()
				}
			}).then((result) => {
				res.status(201).json({ message: "User signed up successfully", data: {} })
			})
		}
		res.status(400).json({
			message: "User with email already exists"
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err)
	}
}

const forgotPassword = (req, res, next) => {
	const { email } = req.body;
}

const resetPassword = (req, res, next) => {
	const { password, confirmPassword } = req.body;
	const { token } = req.params;

}

export const authController = {
	loginUser,
	signupUser
}