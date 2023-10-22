import { Request, Response, NextFunction } from "express";
import CategoriesModel from "../models/categories";

const getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const categories = await CategoriesModel.find();
		if (categories) {
			return res.status(200).json({
				message: "Categories retrieved successfully!",
				data: categories,
			});
		}
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

const createCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name } = req.body;
	try {
		const newCategory = await new CategoriesModel({
			name: name.toLowerCase(),
		}).save();
		res.status(201).json({
			message: "New Category created successfully",
			data: newCategory,
		});
	} catch (error) {
		if (!error.status) {
			error.status = 500;
		}
		next(error);
	}
};

export const categoryController = {
	getCategories,
	createCategory,
};
