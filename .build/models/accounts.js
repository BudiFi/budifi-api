"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const accountSchema = new Schema({
    accountDetails: {},
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
exports.default = mongoose_1.default.model("Accounts", accountSchema);
//# sourceMappingURL=accounts.js.map