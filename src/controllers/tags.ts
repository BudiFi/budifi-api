import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { type Response, type Request, type NextFunction } from "express";
import { TagService } from "@src/services/tags";

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = await TagService.getTags();
		if (tags) {
			return res.status(200).json({
				message: "Tags List retrieved successfully!",
				data: tags,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving tags",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const getTagsById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const tagId = new mongoose.Types.ObjectId(id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const tag = await TagService.getTag(tagId);
		if (tag) {
			return res.status(200).json({
				message: "Tag retrieved successfully!",
				data: tag,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving tag",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const createNewTag = async (req: Request, res: Response, next: NextFunction) => {
	const { title, color, userId } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// const error: any = new Error(`Required fields missing`);
		// error.status = 400;
		// error.data = errors.array();
		// throw error;
		return res.status(400).json({
			message: "Required fields missing",
			data: errors.array(),
		});
	}
	try {
		const newIncome = await TagService.createTag({ title, color, userId });
		console.log(newIncome, "incomeList");
		if (newIncome) {
			return res.status(200).json({
				message: "New income added successfully!",
				data: newIncome,
			});
		}
		return res.status(400).json({
			message: "Something went wrong retrieving income",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};
export const editTag = async (req: Request, res: Response, next: NextFunction) => {
	const { title, color, userId } = req.body;
	const { id } = req.params;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const updatedTag = await TagService.updateTag(id, { title, color, userId });

		if (updatedTag) {
			return res.status(200).json({
				message: "Tag updated successfully!",
				data: updatedTag,
			});
		}
		return res.status(400).json({
			message: "Something went wrong updating tag",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const removeTag = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error("Required fields missing");
		error.status = 400;
		error.data = errors.array();
		throw error;
	}
	try {
		const income = await TagService.deleteTag(id);
		if (income) {
			return res.status(200).json({
				message: "Tag deleted successfully!",
			});
		}
		return res.status(400).json({
			message: "Something went wrong deleting tag",
		});
	} catch (error: any) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};
