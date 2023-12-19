import { ExpenseRepository } from "@src/repository/expense";
import mongoose, { Document } from "mongoose";
import { ICreateProps, IExpenseResponse, IExpenseItemProps, IExpenseItemResponse } from "@src/interfaces/expense";
import { staticError } from "@utils/index";

const getExpenseList = async () => {
	try {
		const results = await ExpenseRepository.getAll();
		if (results) return results;
		return null;
	} catch (error) {
		staticError();
	}
};
const getExpense = async (id: string): Promise<IExpenseResponse | null> => {
	try {
		const results = await ExpenseRepository.getById(id);
		if (results) return results;
		return null;
	} catch (error) {
		console.log(error, "error");
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const createList = async (data: ICreateProps): Promise<Document | null> => {
	try {
		const results = await ExpenseRepository.create(data);
		if (results) return results;
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const getExpenseItemById = async (id: string): Promise<IExpenseItemResponse | null> => {
	try {
		const results = await ExpenseRepository.getItemById(id);
		if (results) return results;
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const createItem = async (id: string, data: IExpenseItemProps): Promise<Document<IExpenseItemResponse> | null> => {
	try {
		const expenseList = await getExpense(id);
		if (!expenseList) {
			const err = new Error("Expense list with Id not found");
			throw err;
		}
		const results = await ExpenseRepository.createItem(data);
		if (results) {
			expenseList.items.push(results._id);
			await expenseList.save();
			return results;
		}
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const updateExpenseItem = async (id: string, data: IExpenseItemProps) => {
	try {
		const item = await getExpenseItemById(id);
		const { name, amount, description = "", recurring, categoryId, tags = [] } = data;

		if (item) {
			item.name = name;
			item.amount = amount;
			item.description = description;
			item.categoryId = categoryId;
			item.tags = tags;
			item.recurring = recurring;

			const result = await item.save();
			return result;
		}
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const deleteItem = async (id: string) => {
	try {
		const item = await getExpenseItemById(id);
		if (item) {
			const deleteItem = await ExpenseRepository.removeItem(id);
			return deleteItem;
		}
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

export const ExpenseService = {
	getExpenseList,
	getExpense,
	createList,
	createItem,
	getExpenseItemById,
	updateExpenseItem,
	deleteItem,
};
