import mongoose, { Document } from "mongoose";

export interface IIncomeResponse extends Document {
	_id: mongoose.Types.ObjectId;
	title?: string | undefined;
	amount: number;
	transactionId?: mongoose.Types.ObjectId | undefined;
	createdAt: Date;
	updatedAt: Date;
}

export type IAllIncomeResponse = {
	data: IIncomeResponse[];
	total: number;
};

export interface IncomeResult {
	incomes: IIncomeResponse[];
	totalIncome: number;
}
export type ICreateIncomeProps = {
	title?: string;
	amount: number;
	transactionId?: string;
};
export type IIncomeProps = {
	title?: string;
	amount?: number;
};

export type IDateFilterProps = {
	startDate: Date;
	endDate: Date;
};

export type ObjectId = string | mongoose.Types.ObjectId;

export interface IIncomeRepository {
	getAll: () => Promise<IAllIncomeResponse | null>;
	getById: (id: ObjectId) => Promise<IIncomeResponse | null>;
	create: (data: ICreateIncomeProps) => Promise<Document | null>;
	getByDate: (props: IDateFilterProps) => Promise<IAllIncomeResponse | null>;
	update: (id: ObjectId, data: IIncomeProps) => Promise<IIncomeResponse | null>;
	removeItem: (id: ObjectId) => Promise<Document | null>;
	// removeDeletedItemFromList: (id: string, itemId: ObjectId) => Promise<Document | null>;
}
