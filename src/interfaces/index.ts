export type ResponseError = {
	status?: number;
	data?: string | any[];
	message?: string;
};
export type CatchError = Error & ResponseError;
