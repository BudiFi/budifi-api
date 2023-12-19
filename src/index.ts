import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "@routes/auth";
import path from "path";
import expenseRoutes from "@routes/expense";
import categoryRoutes from "@routes/category";
import incomeRoutes from "@routes/income";

const MONGO_SECRET = process.env.MONGO_SECRET;
const MONGO_USER = process.env.MONGO_USER;
const STAGING_DB = process.env.MONGO_DEFAULT_DATABASE;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_SECRET}@cluster0.l6ikclz.mongodb.net/${STAGING_DB}`;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "template")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type Authorization");
	next();
});

app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	console.log(error);
	const status = error.status ?? 500;
	const message = error.message;
	res.status(status).json({
		message: message,
	});
});

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to db successfully!");
		app.listen(process.env.PORT ?? 5050, () => {
			console.log("App is running on port 5050");
		});
	})
	.catch(err => {
		const error: any = new Error(err.message);
		error.status = 500;
		throw error;
	});
