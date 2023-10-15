import express from 'express';
import { categoryController } from '../controllers/category.js';
const router = express.Router();
const { getCategories } = categoryController;
router.get("/", getCategories);
export default router;
