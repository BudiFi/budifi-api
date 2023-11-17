import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY ?? "";

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, userPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, userPassword);
};

export const generateToken = (param1: string, param2: string) => {
	return JWT.sign(
		{
			email: param1,
			userId: param2,
		},
		SECRET,
		{ expiresIn: "7d" }
	);
};
