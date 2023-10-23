"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("@routes/auth"));
const path_1 = __importDefault(require("path"));
const expense_1 = __importDefault(require("@routes/expense"));
const category_1 = __importDefault(require("@routes/category"));
const MONGO_SECRET = process.env.MONGO_SECRET;
const MONGO_USER = process.env.MONGO_USER;
const STAGING_DB = process.env.MONGO_DEFAULT_DATABASE;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_SECRET}@cluster0.l6ikclz.mongodb.net/${STAGING_DB}`;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "template")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type Authorization");
    next();
});
app.use("/expenses", expense_1.default);
app.use("/auth", auth_1.default);
app.use("/category", category_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status ?? 500;
    const message = error.message;
    res.status(status).json({
        message: message,
    });
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Connected to db successfully!");
    app.listen(process.env.PORT || 5050, () => {
        console.log("App is running on port 5050");
    });
})
    .catch(err => {
    const error = new Error(err.message);
    error.status = 500;
    throw error;
});
//# sourceMappingURL=index.js.map