"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.default = mongoose.model("Expense", expenseSchema);
