import mongoose, { Document } from "mongoose";

export type ObjectId = string | mongoose.Types.ObjectId;
export interface ITagResponse extends Document {
	_id: ObjectId;
	title: string;
	color: string;
	userId: ObjectId;
}

export interface ITagProps {
	title: string;
	color?: string;
	userId: ObjectId;
}

export interface ITagsRepository {
	getAll: () => TagResponseArr;
	getById: (id: ObjectId) => PromiseTagResponse;
	update: (id: ObjectId, data: ITagProps) => PromiseTagResponse;
	deleteItem: (id: ObjectId) => PromiseTagResponse;
	create: (data: ITagProps) => PromiseTagResponse;
}

export type PromiseTagResponse = Promise<ITagResponse | null>;
export type TagResponseArr = Promise<ITagResponse[] | null>;

export interface ITagService {
	getTags: () => TagResponseArr;
	getTag: (id: ObjectId) => PromiseTagResponse;
	createTag: (data: ITagProps) => PromiseTagResponse;
	updateTag: (id: ObjectId, data: ITagProps) => PromiseTagResponse;
	deleteTag: (id: ObjectId) => PromiseTagResponse;
}
