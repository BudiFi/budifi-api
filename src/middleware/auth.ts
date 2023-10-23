import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET = process.env.SECRET_KEY ?? "";

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		const err: any = new Error("Unauthenticated");
		err.status = 401;
		throw err;
	}
	const token: string = authHeader.split(" ")[1] ?? "";
	let verifiedToken;
	if (token && token !== "") {
		try {
			verifiedToken = jwt.verify(token, SECRET);
			next();
		} catch (err: any) {
			err.status = 400;
			throw err;
		}
		if (!verifiedToken) {
			const err: any = new Error("Not Authenticated");
			err.status = 400;
			throw err;
		}
	}
};
