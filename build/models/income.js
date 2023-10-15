"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var incomeSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: "transactions",
        required: false
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Income', incomeSchema);
