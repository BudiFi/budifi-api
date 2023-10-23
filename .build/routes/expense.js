"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_1 = require("../controllers/expense");
const auth_1 = require("../middleware/auth");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, expense_1.getExpenses);
router.get("/:id", auth_1.authenticate, expense_1.getExpenseById);
router.post("/", auth_1.authenticate, [(0, express_validator_1.body)("title").notEmpty().trim().withMessage("Expense title is required")], expense_1.createExpense);
router.post("/:id/expense-item", auth_1.authenticate, [(0, express_validator_1.param)("id").exists().isString().withMessage("Expense id is required")], expense_1.addExpenseItem);
router.put("/", auth_1.authenticate, expense_1.createExpense);
router.delete("/", auth_1.authenticate, expense_1.createExpense);
exports.default = router;
//# sourceMappingURL=expense.js.map