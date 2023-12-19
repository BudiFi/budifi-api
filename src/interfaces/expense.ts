import mongoose, { ObjectId, Document } from "mongoose";

export interface IExpenseResponse extends Document {
	_id: ObjectId;
	title: string;
	items: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IExpenseItemResponse extends Document {
	_id: ObjectId;
	name: string;
	amount: number;
	description: string;
	categoryId: string;
	tags: string[];
	recurring: boolean;
	expenseId: ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export type ICreateProps = {
	title: string;
};

export interface IExpenseItemProps {
	name: string;
	amount: number;
	description?: string;
	categoryId: string;
	tags?: string[];
	recurring: boolean;
	expenseId: mongoose.Types.ObjectId;
}

export interface IExpenseRepository {
	getAll: () => Promise<Document[] | null>;
	getById: (id: string) => Promise<IExpenseResponse | null>;
	create: (data: ICreateProps) => Promise<Document | null>;
	createItem: (data: IExpenseItemProps) => Promise<Document | null>;
	getItemById: (id: string) => Promise<IExpenseItemResponse | null>;
	removeItem: (id: string) => Promise<Document | null>;
	removeDeletedItemFromList: (id: string, itemId: ObjectId) => Promise<Document | null>;
}
