"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var expenseItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        require: false
    },
    category: {
        type: String,
        categoryId: Schema.Types.ObjectId,
        ref: "Categories"
    },
    tags: {
        type: String,
        tagId: Schema.Types.ObjectId,
        required: false
    },
    purchasedAmount: {
        type: Number,
        required: false
    },
    expenseId: {
        type: Schema.Types.ObjectId,
        ref: "Expense"
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("ExpenseItem", expenseItemSchema);
