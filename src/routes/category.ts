import express from "express";
import { categoryController } from "../controllers/category";
import { authenticate } from "../middleware/auth";

const router = express.Router();
const { getCategories, createCategory } = categoryController;

router.get("/", authenticate, getCategories);
router.post("/", authenticate, createCategory);

export default router;
