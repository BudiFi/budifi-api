"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_validator_1 = require("express-validator");
var users_js_1 = __importDefault(require("../models/users.js"));
var HASH_KEY = process.env.SECRET_KEY || "";
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, errors, err, result, err;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, password = _a.password;
        errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            err = new Error("Input required fields");
            err.statusCode = 400;
            throw err;
        }
        try {
            result = users_js_1.default.findOne({ email: email });
            if (!result) {
                res.status(404).json({
                    message: "User with email not found",
                });
            }
            // UserModel.
        }
        catch (error) {
            err = new Error(error);
            err.statusCode = 500;
            return [2 /*return*/, next(err)];
        }
        return [2 /*return*/];
    });
}); };
var signupUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, first_name, last_name, errors, err, findUserByEmail, hashedPassword, newUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, first_name = _a.first_name, last_name = _a.last_name;
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    err = new Error("Validation failed, input required fields");
                    err.statusCode = 422;
                    err.message = errors.array();
                    throw err;
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, users_js_1.default.findOne({ email: email })];
            case 2:
                findUserByEmail = _b.sent();
                if (!!findUserByEmail) return [3 /*break*/, 5];
                return [4 /*yield*/, bcrypt_1.default.hash(password, HASH_KEY)];
            case 3:
                hashedPassword = _b.sent();
                if (!hashedPassword) return [3 /*break*/, 5];
                return [4 /*yield*/, new users_js_1.default({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: hashedPassword,
                    }).save()];
            case 4:
                newUser = _b.sent();
                res.status(201).json({
                    message: "User signed up successfully",
                    data: {},
                });
                _b.label = 5;
            case 5:
                res.status(400).json({
                    message: "User with email already exists",
                });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                if (!err_1.statusCode) {
                    err_1.statusCode = 500;
                }
                next(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var forgotPassword = function (req, res, next) {
    var email = req.body.email;
};
var resetPassword = function (req, res, next) {
    var _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword;
    var token = req.params.token;
};
exports.authController = {
    loginUser: loginUser,
    signupUser: signupUser,
};
