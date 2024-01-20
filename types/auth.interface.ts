export interface SignupFormBody {
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
	admin?: boolean;
	investorTypeId: Number;
	genderId: Number;
	roleId: Number;
}
export interface UserProfile {
	id?: string | undefined;
	name: string;
	email: string;
	image: string | File;
	password?: string;
	genderId?: number | string;
	Gender: {
		id: number;
		gender: string;
	};
	deletedAt?: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface SignInFormBody {
	email: string;
	password: string;
	remember: boolean;
}
