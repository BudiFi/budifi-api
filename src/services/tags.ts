import { ITagProps, ITagService, ObjectId, PromiseTagResponse, TagResponseArr } from "@src/interfaces/tags";
import { TagsRepository } from "@src/repository/tags";

const getTags = async (): TagResponseArr => {
	try {
		const results = await TagsRepository.getAll();
		if (!results) return null;
		return results;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const getTag = async (id: ObjectId): PromiseTagResponse => {
	try {
		const results = await TagsRepository.getById(id);
		if (!results) return null;
		return results;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

const updateTag = async (id: ObjectId, data: ITagProps): PromiseTagResponse => {
	try {
		const findTag = await getTag(id);
		if (!findTag) {
			const err: any = new Error("Could not find tag with Id");
			err.status = 404;
			throw err;
		}
		const results = await TagsRepository.update(id, data);
		if (!results) return null;
		return results;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};
const deleteTag = async (id: ObjectId): PromiseTagResponse => {
	try {
		const findTag = await getTag(id);
		if (!findTag) {
			const err: any = new Error("Could not find tag with Id");
			err.status = 404;
			throw err;
		}
		const results = await TagsRepository.deleteItem(id);
		if (!results) return null;
		return results;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};
const createTag = async (data: ITagProps): PromiseTagResponse => {
	try {
		const results = await TagsRepository.create(data);
		if (!results) return null;
		return results;
	} catch (error) {
		const err = new Error("Something went wrong, server error");
		throw err;
	}
};

export const TagService: ITagService = {
	getTags,
	getTag,
	createTag,
	updateTag,
	deleteTag,
};
