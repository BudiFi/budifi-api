import IncomeModel from "@models/income";
import {
	IAllIncomeResponse,
	ICreateIncomeProps,
	IDateFilterProps,
	IIncomeProps,
	IIncomeRepository,
	IIncomeResponse,
	ObjectId,
} from "@src/interfaces/income";

const getAll = async (): Promise<IAllIncomeResponse | null> => {
	const [data] = await IncomeModel.aggregate([
		{
			$group: {
				_id: null,
				data: { $push: "$$ROOT" },
				total: { $sum: "$amount" },
			},
		},
		{
			$project: {
				_id: 0,
				data: 1,
				total: 1,
			},
		},
	]).exec();
	return data;
};

const getById = async (id: ObjectId): Promise<IIncomeResponse | null> => {
	const results = await IncomeModel.findById(id).exec();
	return results;
};

const getByDate = async ({ startDate, endDate }: IDateFilterProps): Promise<IAllIncomeResponse | null> => {
	const [data] = await IncomeModel.aggregate([
		{ $match: { createdAt: { $gte: startDate, $lte: endDate } } },
		{
			$group: {
				_id: null,
				data: { $push: "$$ROOT" },
				total: { $sum: "$amount" },
			},
		},
	]).exec();
	return data;
};

const create = async (data: ICreateIncomeProps) => {
	return await new IncomeModel(data).save();
};

const update = async (id: ObjectId, data: IIncomeProps): Promise<IIncomeResponse | null> => {
	const results = await IncomeModel.findByIdAndUpdate(id, data).exec();
	return results;
};
const removeItem = async (id: ObjectId) => {
	const result = await IncomeModel.findByIdAndDelete(id);
	return result;
};

export const IncomeRepository: IIncomeRepository = {
	getAll,
	getById,
	create,
	getByDate,
	update,
	removeItem,
};
