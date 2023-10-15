import express from "express";
import { categoryController } from "../controllers/category";

const router = express.Router();
const { getCategories } = categoryController;

router.get("/", getCategories);

export default router;
