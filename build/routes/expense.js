"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var expense_1 = require("../controllers/expense");
var router = express_1.default.Router();
var getExpenses = expense_1.expenseController.getExpenses, createExpense = expense_1.expenseController.createExpense, getExpenseById = expense_1.expenseController.getExpenseById;
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/", createExpense);
router.delete("/", createExpense);
exports.default = router;
