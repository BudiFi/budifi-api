import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expense.js";
import categoryRoutes from "./routes/category.js";
dotenv.config();
const MONGO_SECRET = process.env.MONGO_SECRET;
const MONGO_USER = process.env.MONGO_USER;
const STAGING_DB = process.env.MONGO_DEFAULT_DATABASE;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_SECRET}@cluster0.l6ikclz.mongodb.net/${STAGING_DB}`;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/expenses", expenseRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to db successfully!");
        app.listen(process.env.PORT || 5050, () => {
            console.log("App is running on port 5050");
        });
    })
    .catch((err) => {
        console.error(MONGO_URI);
        const error = new Error(err.message);
        error.status = 500;
        throw error;
    });
