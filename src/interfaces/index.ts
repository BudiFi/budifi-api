export type ResponseError = {
	status?: number;
	data?: string | any[];
};
export type CatchError = Error & ResponseError;

