export interface ResponseError extends Error {
	status?: number;
}

export type IUser = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};
