"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var auth_1 = __importDefault(require("./routes/auth"));
var expense_1 = __importDefault(require("./routes/expense"));
var category_1 = __importDefault(require("./routes/category"));
dotenv_1.default.config();
var MONGO_SECRET = process.env.MONGO_SECRET;
var MONGO_USER = process.env.MONGO_USER;
var STAGING_DB = process.env.MONGO_DEFAULT_DATABASE;
var MONGO_URI = "mongodb+srv://".concat(MONGO_USER, ":").concat(MONGO_SECRET, "@cluster0.l6ikclz.mongodb.net/").concat(STAGING_DB);
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/expenses", expense_1.default);
app.use("/auth", auth_1.default);
app.use("/category", category_1.default);
mongoose_1.default
    .connect(MONGO_URI)
    .then(function () {
    console.log("Connected to db successfully!");
    app.listen(process.env.PORT || 5050, function () {
        console.log("App is running on port 5050");
    });
})
    .catch(function (err) {
    var error = new Error(err.message);
    error.status = 500;
    throw error;
});
