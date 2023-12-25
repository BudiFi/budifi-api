import express from "express";
import { body } from "express-validator";
import {
	getAllIncome,
	createIncome,
	getIncomeById,
	editIncome,
	removeIncome,
	getIncomeByDate,
} from "@controllers/income";
import { authenticate } from "@src/middleware/auth";

const router = express.Router();

router.get("/", authenticate, getAllIncome);
router.get("/:id", authenticate, getIncomeById);
router.get(
	"/",
	authenticate,
	[body("startdate").notEmpty().trim().isString(), body("endDate").notEmpty().trim().isString()],
	getIncomeByDate
);
router.post("/", authenticate, [body("amount").notEmpty().trim().isNumeric()], createIncome);
router.put("/:id", authenticate, [body("amount").notEmpty().trim().isNumeric()], editIncome);
router.delete("/:id", authenticate, removeIncome);

export default router;
