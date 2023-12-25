import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { type Response, type Request, type NextFunction } from "express";
import { IncomeService } from "@src/services/income";

export const getAllIncome = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const incomeList = await IncomeService.getIncome();
		if (incomeList) {
			return res.status(200).json({
				message: "Income List retrieved successfully!",
				data: incomeList,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getIncomeById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const objectIncomeId = new mongoose.Types.ObjectId(id);
	try {
		const income = await IncomeService.getSingeIncome(objectIncomeId);
		if (income) {
			return res.status(200).json({
				message: "Income List retrieved successfully!",
				data: income,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getIncomeByDate = async (req: Request, res: Response, next: NextFunction) => {
	const { startDate, endDate } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}

	try {
		const income = await IncomeService.getIncomeByDateRange({
			startDate: new Date(startDate),
			endDate: new Date(endDate),
		});
		if (income) {
			return res.status(200).json({
				message: "Income List retrieved successfully!",
				data: income,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const createIncome = async (req: Request, res: Response, next: NextFunction) => {
	const { title, amount, transactionId } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const newIncome = await IncomeService.createNewIncome({ title, amount, transactionId });
		console.log(newIncome, "incomeList");
		if (newIncome) {
			return res.status(200).json({
				message: "New income added successfully!",
				data: newIncome,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};
export const editIncome = async (req: Request, res: Response, next: NextFunction) => {
	const { title, amount } = req.body;
	const { id } = req.params;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}

	try {
		const updatedIncome = await IncomeService.updateIncome(id, { title, amount });

		if (updatedIncome) {
			return res.status(200).json({
				message: "Income updated successfully!",
				data: updatedIncome,
			});
		}
		return res.status(400).json({
			message: "Something went wrong updating income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const removeIncome = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;

	try {
		const income = await IncomeService.deleteIncome(id);
		if (income) {
			return res.status(200).json({
				message: "Income deleted successfully!",
			});
		}
		return res.status(400).json({
			message: "Something went wrong deleting income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};
