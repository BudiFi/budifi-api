import express from "express";
import { expenseController } from "../controllers/expense";
const router = express.Router();

const { getExpenses, createExpense, getExpenseById } = expenseController;

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/", createExpense);
router.delete("/", createExpense);

export default router;
