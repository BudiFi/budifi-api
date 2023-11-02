import { UserRespository } from "@src/repository/user";

const getUserById = async () => {
	try {
		// return await UserRespository.findById(id);
	} catch (error) {}
};

export const signupUser = async (value: any) => {
	return await UserRespository.createUser(value);
};

export const userService: IUserService = {
	signupUser,
	getUserById,
};
