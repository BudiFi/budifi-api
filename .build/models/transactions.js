"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const transactionSchema = new Schema({
    id: {},
    debit: {},
    credit: {},
    account: {},
    connected: {},
    customer: {},
    record: {},
    owner: {},
    env: {},
    created_at: {},
    last_updated: {},
    trans_date: {},
    cleared_date: {},
    unformatted_trans_date: {},
    unformatted_cleared_date: {},
    branch: {},
    ref: {},
    code: {},
    benefactor: {},
    location: {},
    notes: {},
    bank: {},
    balance: {},
    mean: {}
}, { timestamps: true });
exports.default = mongoose_1.default.model("Transactions", transactionSchema);
//# sourceMappingURL=transactions.js.map