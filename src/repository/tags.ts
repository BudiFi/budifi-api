import TagModel from "@models/tags";
import { PromiseTagResponse, ITagsRepository, ObjectId, ITagProps, TagResponseArr } from "@src/interfaces/tags";

const getAll = async (): TagResponseArr => {
	const data = await TagModel.find().exec();
	return data;
};

const getById = async (id: ObjectId): PromiseTagResponse => {
	const data = await TagModel.findById(id).exec();
	return data;
};
const update = async (id: ObjectId, props: ITagProps): PromiseTagResponse => {
	const data = await TagModel.findByIdAndUpdate(id, props);
	return data;
};

const deleteItem = async (id: ObjectId): PromiseTagResponse => {
	const data = await TagModel.findByIdAndDelete(id).exec();
	return data;
};
const create = async (props: ITagProps): PromiseTagResponse => {
	const data = await new TagModel(props).save();
	return data;
};

export const TagsRepository: ITagsRepository = {
	create,
	getAll,
	getById,
	update,
	deleteItem,
};
