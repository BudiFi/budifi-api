import express from "express";
import {
	getExpenses,
	createExpense,
	getExpenseById,
	addExpenseItem,
} from "../controllers/expense";
import { authenticate } from "../middleware/auth";
import { body, param } from "express-validator";
const router = express.Router();

router.get("/", authenticate, getExpenses);
router.get("/:id", authenticate, getExpenseById);
router.post(
	"/",
	authenticate,
	[body("title").notEmpty().trim().withMessage("Expense title is required")],
	createExpense
);
router.post(
	"/:id/expense-item",
	authenticate,
	[param("id").exists().isString().withMessage("Expense id is required")],
	addExpenseItem
);
router.put("/", authenticate, createExpense);
router.delete("/", authenticate, createExpense);

export default router;
