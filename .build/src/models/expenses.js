"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
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
}, { timestamps: true });
exports.default = mongoose.model("Expense", expenseSchema);
//# sourceMappingURL=expenses.js.map