"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const { getCategories, createCategory } = category_1.categoryController;
router.get("/", auth_1.authenticate, getCategories);
router.post("/", auth_1.authenticate, createCategory);
exports.default = router;
//# sourceMappingURL=category.js.map