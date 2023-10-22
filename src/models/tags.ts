import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
		default: "#8C75FA",
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

export default mongoose.model("Tags", tagsSchema);
