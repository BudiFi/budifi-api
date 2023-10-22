import express from "express";
import { expenseController } from "../controllers/expense";
import { authenticate } from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

const { getExpenses, createExpense, getExpenseById } = expenseController;

router.get("/", authenticate, getExpenses);
router.get("/:id", authenticate, getExpenseById);
router.post(
	"/",
	authenticate,
	[body("title").notEmpty().trim().withMessage("Expense title is required")],
	createExpense
);
router.put("/", authenticate, createExpense);
router.delete("/", authenticate, createExpense);

export default router;
