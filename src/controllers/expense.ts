import { Response, Request, NextFunction } from "express";

const getExpenses = (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		message: "Expenses retrieved successfully",
		data: [],
	});
};

const createExpense = (req: Request, res: Response, next: NextFunction) => {
	res.status(201).json({});
};

const getExpenseById = (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({});
};

export const expenseController = {
	getExpenses,
	createExpense,
	getExpenseById,
};
