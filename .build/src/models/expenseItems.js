"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expenseItemSchema = new Schema({
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
}, {
    timestamps: true,
});
exports.default = mongoose.model("ExpenseItem", expenseItemSchema);
//# sourceMappingURL=expenseItems.js.map