import { Model, ModelStatic, WhereOptions } from 'sequelize';
import { SignupFormBody } from '../../types/auth.interface';

export async function doesSuchDataExist(
	Model: ModelStatic<Model<any, any>>,
	where: WhereOptions<any>,
	attributes?: any,
	include = []
) {
	try {
		const data = await Model.findAll({
			where,
			attributes,
			include,
			paranoid: false,
		});
		if (data?.length) {
			return {
				status: true,
				data,
			};
		} else {
			return { status: false, data: null };
		}
	} catch (e) {
		return {
			status: false,
			error: e,
		};
	}
}
export function validateEmail(mail: string) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
export function validatePhone(phone: string) {
	return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
}
export function validatedAuthInfo(body: SignupFormBody, confirmPass = false) {
	const email = body.email || body.username;
	if (!email || !validateEmail(email)) {
		return {
			status: 400,
			message: 'Please enter a valid email',
		};
	}

	if (!body.password || body.password.length < 6) {
		return {
			status: 400,
			message: 'Please enter a password with min. 6 chars',
		};
	}

	if (
		confirmPass &&
		(!body.confirmPassword || body.password != body.confirmPassword)
	) {
		return {
			message: "Password and confirm password doesn't match",
		};
	}

	return true;
}
