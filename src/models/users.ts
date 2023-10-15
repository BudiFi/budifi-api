import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
	resetToken: {
		
	}
}, { timestamps: true });

export default mongoose.model("Users", userSchema);
