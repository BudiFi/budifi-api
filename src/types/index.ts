export type CatchError = Error & ResponseError;
export type ResponseError = {
	status?: number;
	data?: string | any[];
};

export type IUser = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};
