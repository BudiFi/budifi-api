import { IncomeRepository } from "@src/repository/income";
import {
	ICreateIncomeProps,
	IncomeResult,
	IIncomeResponse,
	ObjectId,
	IDateFilterProps,
	IIncomeProps,
} from "@src/interfaces/income";

const getIncome = async (): Promise<IncomeResult | null> => {
	try {
		const results = await IncomeRepository.getAll();
		if (results) {
			const { data, total } = results;
			return { incomes: data, totalIncome: total };
		}
		return null;
	} catch (error) {
		console.log(error, "error");
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const getSingeIncome = async (id: ObjectId): Promise<IIncomeResponse | null> => {
	try {
		const results = await IncomeRepository.getById(id);
		if (results) return results;
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const createNewIncome = async (data: ICreateIncomeProps) => {
	try {
		const results = await IncomeRepository.create(data);
		if (results) {
			return results;
		}
		return null;
	} catch (error) {
		console.log(error);
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const getIncomeByDateRange = async (props: IDateFilterProps) => {
	try {
		const results = await IncomeRepository.getByDate(props);

		if (results) {
			const { data, total } = results;
			return { incomes: data, totalIncome: total };
		}
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const updateIncome = async (id: ObjectId, data: IIncomeProps) => {
	let result;
	try {
		const income = await getSingeIncome(id);
		if (income) {
			if (income.transactionId) {
				result = await IncomeRepository.update(id, { title: data.title });
				return result;
			}
			result = await IncomeRepository.update(id, data);
			return result;
		}
		return null;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const deleteIncome = async (id: ObjectId) => {
	try {
		const income = await getSingeIncome(id);
		if (!income) {
			return null;
		}
		if (income.transactionId) {
			throw Error("Unable to remove income with transactionId");
		}
		const result = await IncomeRepository.removeItem(id);
		return result;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

export const IncomeService = {
	getIncome,
	createNewIncome,
	getSingeIncome,
	getIncomeByDateRange,
	updateIncome,
	deleteIncome,
};
