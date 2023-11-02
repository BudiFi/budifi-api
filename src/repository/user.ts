import { IUser, IUserRepository } from "@src/interfaces/users";
import UserModel from "@models/users";

const getUserById = (id: string) => {
	return UserModel.findById(id);
};

const getUserByEmail = (email: string) => {
	return UserModel.findOne({ email: email });
};

const updateUser = (value: IUser) => {
	return new UserModel(value).save();
};

const createUser = async (value: any) => {
	return await new UserModel(value).save;
};

export const UserRespository = {
	getUserById,
	getUserByEmail,
	updateUser,
	createUser,
};
