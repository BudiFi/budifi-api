import { type Response, type Request, type NextFunction } from "express";
import { validationResult } from "express-validator";
import ExpenseModel from "../models/expenses";
import ExpenseItemModel from "../models/expenseItems";

export const getExpenses = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const expenses = await ExpenseModel.find();
		res.status(200).json({
			message: "Expenses retrieved successfully",
			data: expenses,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const createExpense = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Expense title is required");
		error.status = 400;
		throw error;
	}
	try {
		const newExpense = await new ExpenseModel({ title }).save();
		res.status(201).json({
			message: "New Expense created successfully!",
			data: newExpense,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getExpenseById = async (
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
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getExpenseItemById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { expenseItemId } = req.params;
	try {
		const expenseItem = await ExpenseItemModel.findById(expenseItemId);
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

export const addExpenseItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const {
		name,
		amount,
		description = "",
		categoryId,
		tags = [],
		purchasedAmount = 0,
	} = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const expense = await ExpenseModel.findById(id);
		if (!expense) {
			return res.status(404).json({
				message: "Expense with id not found",
			});
		}
		const expenseItem = await new ExpenseItemModel({
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
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const updateExpense = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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

export const updateExpenseItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const {
		name,
		amount,
		description = "",
		categoryId,
		tags = [],
		purchasedAmount = 0,
	} = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Provide required parameters");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const expenseItem = await ExpenseItemModel.findById(id);
		if (!expenseItem) {
			return res.status(404).json({
				message: "Item with Id not found",
			});
		}
		expenseItem.name = name;
		expenseItem.amount = amount;
		expenseItem.description = description;
		expenseItem.categoryId = categoryId;
		expenseItem.tags = tags;
		expenseItem.purchasedAmount = purchasedAmount;

		const result = await expenseItem.save();
		return res.status(201).json({
			message: "Item updated successfully!",
			data: result,
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const deleteExpenseItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, expenseItemId } = req.params;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Provide required parameters");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const expenseItem = await ExpenseItemModel.findById(expenseItemId);
		const expense = await ExpenseModel.findById(id);

		if (!expenseItem) {
			return res.status(404).json({
				message: "Expense item with id not found",
			});
		}
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};
