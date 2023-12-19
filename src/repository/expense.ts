import { Document } from "mongoose";
import ExpenseModel from "../models/expenses";
import ExpenseItemModel from "../models/expenseItems";
import {
	IExpenseRepository,
	ICreateProps,
	IExpenseItemProps,
	IExpenseResponse,
	IExpenseItemResponse,
} from "@src/interfaces/expense";

const getAll = async (): Promise<Document[] | null> => {
	const results = await ExpenseModel.find();
	return results;
};

const getById = async (id: string): Promise<IExpenseResponse | null> => {
	const results = await ExpenseModel.findById(id).populate("items").exec();
	return results;
};

const create = async (data: ICreateProps) => {
	const results = new ExpenseModel(data).save();
	return results;
};

const createItem = async (data: IExpenseItemProps) => {
	const results = new ExpenseItemModel(data).save();
	return results;
};
const getItemById = async (id: string): Promise<IExpenseItemResponse | null> => {
	const results = await ExpenseItemModel.findById(id);
	return results;
};

const removeItem = async (id: string): Promise<Document | null> => {
	const results = await ExpenseItemModel.deleteOne({ _id: id });
	return results;
};
export const ExpenseRepository: IExpenseRepository = {
	getAll,
	getById,
	create,
	createItem,
	getItemById,
	removeItem,
};
