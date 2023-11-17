import { Schema, Document } from "mongoose";

export type IUser = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};

export type IUserResponse = IUser & {
	_id: Schema.Types.ObjectId;
	timestamps: {
		created_at: Date;
		updated_at: Date;
	};
};

export interface IUserService {
	signupUser: (userData: IUser) => Promise<IUserResponse | null>;
	getUserById: (id: string) => Promise<IUserResponse | null>;
	getUserByEmail: (emailStr: string) => Promise<IUserResponse | null>;
	resetUserPassword: (password: string, userId: string) => Promise<IUserResponse | null>;
}

export interface IUserRepository {
	findById: (id: string) => Promise<IUserResponse | null>;
	findOne: (findParams: any) => Promise<IUserResponse | null>;
	create: (userData: IUser) => Promise<IUserResponse | null>;
	findOneAndUpdate: (searchParams: string, updateValue: any) => Promise<IUserResponse | null>;
}
