import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import ExpenseModel from "../models/expenses";
import { ResponseError } from "types";

const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const expenses = await ExpenseModel.find().populate();
		res.status(200).json({
			message: "Expenses retrieved successfully",
			data: expenses,
		});
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

const createExpense = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: ResponseError = new Error("Expense title is required");
		error.status = 400;
		throw error;
	}
	try {
		const newExpense = await new ExpenseModel({ title }).save();
		res.status(201).json({
			message: "New Expense created successfully!",
			data: newExpense,
		});
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

const getExpenseById = (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({});
};

export const expenseController = {
	getExpenses,
	createExpense,
	getExpenseById,
};
