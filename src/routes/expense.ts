import express from "express";
import {
	getExpenses,
	createExpense,
	getExpenseById,
	addExpenseItem,
	updateExpense,
	updateExpenseItem,
	getExpenseItemById,
} from "../controllers/expense";
import { authenticate } from "../middleware/auth";
import { body, param } from "express-validator";
const router = express.Router();

// GET /expenses
router.get("/", authenticate, getExpenses);

// GET /expenses/:id
router.get("/:id", authenticate, getExpenseById);

// GET /expenses/expense-item/:expenseItemId
router.get("/expense-item/:expenseItemId", authenticate, getExpenseItemById);

// POST /expenses
router.post(
	"/",
	authenticate,
	[body("title").notEmpty().trim().withMessage("Expense title is required")],
	createExpense
);

// PUT /expenses/:id
router.put(
	"/:id",
	authenticate,
	[
		body("title")
			.notEmpty()
			.trim()
			.withMessage("Expense title is required"),
		param("id").exists().isString().withMessage("Expense id is requuired"),
	],
	updateExpense
);

// POST /expenses/:id/expense-item
router.post(
	"/:id/expense-item",
	authenticate,
	[
		param("id").exists().isString().withMessage("Expense id is required"),
		body("name").notEmpty().trim().withMessage("name is required"),
		body("amount").notEmpty().trim().withMessage("amount is required"),
		body("categoryId")
			.notEmpty()
			.trim()
			.withMessage("categoryId is required"),
	],
	addExpenseItem
);

// PUT /expenses/expense-item/:id
router.put(
	"/expense-item/:id",
	authenticate,
	[
		param("id").exists().isString().withMessage("Expense id is required"),
		body("name").notEmpty().trim().withMessage("name is required"),
		body("amount").notEmpty().trim().withMessage("amount is required"),
		body("categoryId")
			.notEmpty()
			.trim()
			.withMessage("categoryId is required"),
	],
	updateExpenseItem
);

// DELETE /expenses/:id
router.delete("/:id", authenticate, createExpense);

// DELETE /expenses/:id/expense-item/:expenseItemId
router.delete("/:id/expense-item/:expenseItemId", authenticate, createExpense);

export default router;
