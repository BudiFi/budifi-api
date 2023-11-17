import { IUser, IUserService } from "@src/interfaces/users";
import { UserRespository } from "@src/repository/user";
import { utilsService } from ".";

const getUserById = async (userId: string) => {
	try {
		const results = await UserRespository.findById(userId);
		if (results) return results;
		return null;
	} catch (error) {
		console.error(error);
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const getUserByEmail = async (userEmail: string) => {
	try {
		const results = await UserRespository.findOne({ email: userEmail });
		if (results) return results;
		return null;
	} catch (error) {
		console.error(error);
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const resetUserPassword = async (password: string, userId: string) => {
	try {
		const hashedPassword = await utilsService.hashPassword(password);
		if (hashedPassword) {
			return await UserRespository.findOneAndUpdate(userId, {
				password: hashedPassword,
			});
		}
		return null;
	} catch (error) {
		console.error(error);
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

export const signupUser = async (value: IUser) => {
	try {
		const results = await UserRespository.create(value);
		if (results) return results;
		return null;
	} catch (error) {
		console.error(error);
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

export const userService: IUserService = {
	signupUser,
	getUserById,
	getUserByEmail,
	resetUserPassword,
};
