import UserModel from "@models/users";
import mongoose from "mongoose";
import { IUserRepository, IUserResponse } from "@src/interfaces/users";

const findById = async (id: string): Promise<IUserResponse | null> => {
	const user = await UserModel.findById(id).exec();
	return user?.toObject() ?? null;
};

const findOne = async (findParams: any): Promise<IUserResponse | null> => {
	const user = await UserModel.findOne(findParams).exec();
	return user?.toObject() ?? null;
};

const create = async (value: any): Promise<IUserResponse | null> => {
	const user = await new UserModel(value).save();
	return user?.toObject() ?? null;
};
const findOneAndUpdate = async (
	searchParams: string,
	updateValue: Record<string, any>
): Promise<IUserResponse | null> => {
	const id = new mongoose.Types.ObjectId(searchParams);
	const result = await UserModel.findByIdAndUpdate(id, updateValue, { new: true }).exec();
	return result?.toObject() ?? null;
};

export const UserRespository: IUserRepository = {
	findById,
	findOne,
	create,
	findOneAndUpdate,
};
