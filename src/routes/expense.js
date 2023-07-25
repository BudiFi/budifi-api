const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense");
const { getExpenses, createExpense, getExpenseById } = expenseController;

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/", createExpense);
router.delete("/", createExpense);

module.exports = router;