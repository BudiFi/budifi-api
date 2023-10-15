"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_1 = require("../controllers/category");
var router = express_1.default.Router();
var getCategories = category_1.categoryController.getCategories;
router.get("/", getCategories);
exports.default = router;
