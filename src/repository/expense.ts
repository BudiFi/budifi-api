import { Document, ObjectId } from "mongoose";
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
	const results = await ExpenseItemModel.findById(id).populate("tags").exec();
	return results;
};

const removeItem = async (id: string): Promise<Document | null> => {
	const results = await ExpenseItemModel.findByIdAndDelete(id).exec();
	return results;
};

const removeDeletedItemFromList = async (id: string, itemId: ObjectId) => {
	const results = await ExpenseModel.findByIdAndUpdate(id, { $pull: { items: itemId } }).exec();
	return results;
};
export const ExpenseRepository: IExpenseRepository = {
	getAll,
	getById,
	create,
	createItem,
	getItemById,
	removeItem,
	removeDeletedItemFromList,
};

/* Find all ExpenseItems with their populated Categories and Tags:
const expenseItemsWithDetails = await ExpenseItem.find().populate("categoryId").populate("tags").exec(); */

/* Find ExpenseItems for a specific Expense:
const expenseIdToFind = "your-expense-id";
const expenseItemsForExpense = await ExpenseItem.find({ expenseId: expenseIdToFind }).exec();
console.log(expenseItemsForExpense); */

// Find Expenses with a specific ExpenseItem ID:
/* const expenseItemIdToFind = "your-expense-item-id";
const expenseWithItem = await Expense.findOne({ items: expenseItemIdToFind }).exec();
console.log(expenseWithItem); */
