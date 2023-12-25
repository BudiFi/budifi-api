import express from "express";
import { body, param } from "express-validator";
import { getAllTags, getTagsById, createNewTag, editTag, removeTag } from "@controllers/tags";
import { authenticate } from "@src/middleware/auth";

const router = express.Router();

router.get("/", authenticate, getAllTags);
router.get("/:id", authenticate, [param("id").notEmpty().trim().isString()], getTagsById);
router.post(
	"/",
	authenticate,
	[
		body("title").notEmpty().trim().isString(),
		body("color").notEmpty().trim().isString().isHexColor(),
		body("userId").notEmpty().trim().isString(),
	],
	createNewTag
);
router.put(
	"/:id",
	authenticate,
	[
		body("title"),
		body("color").notEmpty().trim().isString().isHexColor(),
		body("userId").notEmpty().trim().isString(),
		param("id").notEmpty().trim().isString(),
	],
	editTag
);
router.delete("/:id", authenticate, [param("id").notEmpty().trim().isString()], removeTag);

export default router;
