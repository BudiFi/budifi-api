"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExpenseItem = exports.getExpenseById = exports.createExpense = exports.getExpenses = void 0;
const express_validator_1 = require("express-validator");
const expenses_1 = __importDefault(require("../models/expenses"));
const expenseItems_1 = __importDefault(require("../models/expenseItems"));
const getExpenses = async (req, res, next) => {
    try {
        const expenses = await expenses_1.default.find().populate();
        res.status(200).json({
            message: "Expenses retrieved successfully",
            data: expenses,
        });
    }
    catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};
exports.getExpenses = getExpenses;
const createExpense = async (req, res, next) => {
    const { title } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Expense title is required");
        error.status = 400;
        throw error;
    }
    try {
        const newExpense = await new expenses_1.default({ title }).save();
        res.status(201).json({
            message: "New Expense created successfully!",
            data: newExpense,
        });
    }
    catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};
exports.createExpense = createExpense;
const getExpenseById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const expense = await expenses_1.default.findById(id).populate();
        if (!expense) {
            return res.status(404).json({
                message: "Expense with id not found",
            });
        }
        res.status(200).json({
            message: "Expense list retrieved successfully!",
            data: expense,
        });
    }
    catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};
exports.getExpenseById = getExpenseById;
const addExpenseItem = async (req, res, next) => {
    const { id } = req.params;
    const { name, amount, description = "", categoryId, tags = [], purchasedAmount = 0, } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Required fields missing");
        error.status = 400;
        error.data = errors.array();
        throw error;
    }
    try {
        const expense = await expenses_1.default.findById(id);
        if (!expense) {
            return res.status(404).json({
                message: "Expense with id not found",
            });
        }
        const expenseItem = await new expenseItems_1.default({
            name,
            amount,
            description,
            categoryId,
            tags,
            purchasedAmount,
            expenseId: id,
        }).save();
        expense.items.push(expenseItem._id);
        await expense.save();
        return res.status(201).json({
            message: "New Item added to list successfully!",
            data: expenseItem,
        });
    }
    catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};
exports.addExpenseItem = addExpenseItem;
//# sourceMappingURL=expense.js.map