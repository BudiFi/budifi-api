const getExpenses = (req, res, next) => {
    res.status(200).json({
        message: "Expenses retrieved successfully",
        data: [],
    });
};
const createExpense = (req, res, next) => {
    res.status(201).json({});
};
const getExpenseById = (req, res, next) => {
    res.status(200).json({});
};
export const expenseController = {
    getExpenses,
    createExpense,
    getExpenseById,
};
