const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		items: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: "ExpenseItem",
			},
		],
	},

	{ timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
