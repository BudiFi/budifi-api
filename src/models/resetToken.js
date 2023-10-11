import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema({
	token: {
		type: String,
		required: false
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	}
})