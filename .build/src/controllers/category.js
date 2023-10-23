"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const categories_1 = __importDefault(require("../models/categories"));
const getCategories = async (req, res, next) => {
    try {
        const categories = await categories_1.default.find();
        if (categories) {
            return res.status(200).json({
                message: "Categories retrieved successfully!",
                data: categories,
            });
        }
    }
    catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};
const createCategory = async (req, res, next) => {
    const { name } = req.body;
    try {
        const newCategory = await new categories_1.default({
            name: name.toLowerCase(),
        }).save();
        res.status(201).json({
            message: "New Category created successfully",
            data: newCategory,
        });
    }
    catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};
exports.categoryController = {
    getCategories,
    createCategory,
};
//# sourceMappingURL=category.js.map