export type IUser = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};

export interface IUserService {
	getUserById: (UserRespository: IUserRepository) => Promise<any>;
	signupUser: (value: any) => any;
}

export interface IUserRepository {
	findById: (id: string) => void;
}
