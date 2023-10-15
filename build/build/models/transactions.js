"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var transactionSchema = new Schema({
    id: {},
    // ObjectID	Unique Auth ID(Unique Okra Identifier)
    debit: {},
    // Number	The amount deducted from an account
    credit: {},
    // Number	The amount credited to an account
    account: {},
    // ObjectID	Unique account ID(Unique Okra Identifier)
    connected: {},
    // Boolean	Customer connection status(Did they choose to connect this account to you?)
    customer: {},
    // ObjectID	Unique Customer ID(Unique Okra Identifier)
    // See Manage Customers ]
    record: {},
    // ObjectID	Unique Record ID(Unique Okra Identifier)
    owner: {},
    // ObjectID	Unique Company ID(Unique Okra Identifier) (Your Client Token)
    env: {},
    // String	Okra API env the Auth was pulled from production or production - sandbox
    created_at: {},
    // Date	Date transaction was fetched
    last_updated: {},
    // Date	Last date transaction fetched
    trans_date: {},
    // Date	The date a transaction occurred
    cleared_date: {},
    // Date	The date a transaction was cleared at the bank
    unformatted_trans_date: {},
    // String	The date transaction occurred(from the bank)
    unformatted_cleared_date: {},
    // String	The date transaction cleared(from the bank)
    branch: {},
    // String	The branch transactions occurred
    ref: {},
    // String	The bank reference ID(from the bank)
    code: {},
    // String	Bank Code(from the bank)
    benefactor: {},
    // ObjectID	Customer ID of the sender(within Okra)
    location: {},
    // String	The location or channel the transaction took place
    notes: {},
    // Object	Breakdown of Narrative from bank
    bank: {},
    // ObjectID	Unique Bank ID(Unique Okra Identifier)
    balance: {},
    // Number	Balance after transaction line
    mean: {}
}, { timestamps: true });
exports.default = mongoose_1.default.model("Transactions", transactionSchema);
