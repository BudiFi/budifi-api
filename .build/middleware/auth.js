"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET_KEY ?? "";
const authenticate = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const err = new Error("Unauthenticated");
        err.status = 401;
        throw err;
    }
    const token = authHeader.split(" ")[1] ?? "";
    let verifiedToken;
    if (token && token !== "") {
        try {
            verifiedToken = jsonwebtoken_1.default.verify(token, SECRET);
            next();
        }
        catch (err) {
            err.status = 400;
            throw err;
        }
        if (!verifiedToken) {
            const err = new Error("Not Authenticated");
            err.status = 400;
            throw err;
        }
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map