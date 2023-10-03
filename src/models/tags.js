const mongoose = reqire("mongoose");
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	user: {
		user_id: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}
});

module.exports = mongoose.model('Tags', tagsSchema)