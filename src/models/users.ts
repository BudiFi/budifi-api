import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { IUser } from "@src/interfaces/users";

const userSchema = new Schema<IUser>(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Users", userSchema);
