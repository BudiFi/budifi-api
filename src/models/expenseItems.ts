const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseItemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			require: false,
		},
		categoryId: {
			type: Schema.Types.ObjectId,
			required: true,
			default: "essential",
			ref: "Categories",
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				required: false,
				ref: "Tags",
			},
		],
		purchasedAmount: {
			type: Number,
			required: false,
		},
		expenseId: {
			type: Schema.Types.ObjectId,
			ref: "Expense",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("ExpenseItem", expenseItemSchema);
