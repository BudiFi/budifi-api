import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import ExpenseModel from "../models/expenses";
import { ResponseError } from "types";

const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const expenses = await ExpenseModel.find();
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

const getExpenseById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	console.log(id);
	try {
		const expense = await ExpenseModel.findById(id).populate();
		if (!expense) {
			return res.status(404).json({
				message: "Expense with id not found",
			});
		}
		res.status(200).json({
			message: "Expense list retrieved successfully!",
			data: expense,
		});
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const expenseController = {
	getExpenses,
	createExpense,
	getExpenseById,
};
