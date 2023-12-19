import { type Response, type Request, type NextFunction } from "express";
import { validationResult } from "express-validator";
import ExpenseModel from "../models/expenses";
import { ExpenseService } from "@src/services/expense";
import mongoose from "mongoose";

export const getExpensesList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const expenses = await ExpenseService.getExpenseList();
		if (expenses) {
			return res.status(200).json({
				message: "Expenses retrieved successfully",
				data: expenses,
			});
		}
		return res.status(400).json({
			message: "Something went wrong fetching expenses ",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
	const { title } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Expense title is required");
		error.status = 400;
		throw error;
	}
	try {
		const newExpense = await ExpenseService.createList({ title });
		if (newExpense) {
			return res.status(201).json({
				message: "New Expense created successfully!",
				data: newExpense,
			});
		}
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getExpenseListById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	try {
		const expense = await ExpenseService.getExpense(id);
		if (!expense) {
			return res.status(404).json({
				message: "Expense with id not found",
			});
		}
		res.status(200).json({
			message: "Expense list retrieved successfully!",
			data: expense,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getExpenseItemById = async (req: Request, res: Response, next: NextFunction) => {
	const { expenseItemId } = req.params;
	try {
		const expenseItem = await ExpenseService.getExpenseItemById(expenseItemId);
		if (!expenseItem) {
			return res.status(404).json({
				message: "Expense item with id not found",
			});
		}
		res.status(200).json({
			message: "Expense Item retrieved successfully",
			data: expenseItem,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const addExpenseItem = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { name, amount, description = "", categoryId, tags = [], recurring = false } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	console.log(id, "expenseId");
	try {
		const newItem = await ExpenseService.createItem(id, {
			name,
			amount,
			description,
			categoryId,
			tags,
			recurring,
			expenseId: new mongoose.Types.ObjectId(id),
		});
		console.log(newItem);
		if (newItem) {
			return res.status(201).json({
				message: "New Item added to list successfully!",
				data: newItem,
			});
		}
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { title } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields not available");
		error.status = 400;
		throw error;
	}
	try {
		const expense = await ExpenseModel.findById(id);
		if (!expense) {
			return res.status(404).json({
				message: "Expense with id not found",
			});
		}
		expense.title = title;
		await expense.save();
		return res.status(201).json({
			message: "Expense updated successfully!",
			data: expense,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const updateExpenseItem = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Provide required parameters");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const expenseItem = await ExpenseService.updateExpenseItem(id, req.body);

		return res.status(201).json({
			message: "Item updated successfully!",
			data: expenseItem,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const deleteExpenseItem = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Provide required parameters");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const expenseItem = await ExpenseService.deleteItem(id);

		if (!expenseItem) {
			return res.status(400).json({
				message: "Something went wrong deleting item",
			});
		}
		return res.status(200).json({
			message: "Expense Item removed successfully!",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};
