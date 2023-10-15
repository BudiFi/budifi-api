"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseController = void 0;
var getExpenses = function (req, res, next) {
    res.status(200).json({
        message: "Expenses retrieved successfully",
        data: [],
    });
};
var createExpense = function (req, res, next) {
    res.status(201).json({});
};
var getExpenseById = function (req, res, next) {
    res.status(200).json({});
};
exports.expenseController = {
    getExpenses: getExpenses,
    createExpense: createExpense,
    getExpenseById: getExpenseById,
};
