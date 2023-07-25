const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        categoryId: Schema.Types.ObjectId,
        ref: "Categories"
    },
    purchasedAmount: {
        type: Number,

    },
    expense: {
        expenseId: Schema.Types.ObjectId,
        ref:"Expense"
    }
})

module.exports= mongoose.model("ExpenseItem", expenseItemSchema)