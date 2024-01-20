import bcrypt from 'bcryptjs';
import {
	validatedAuthInfo,
	doesSuchDataExist,
} from '../services/validationService';
import db from '../../models';
import {
	SignInFormBody,
	SignupFormBody,
	UserProfile,
} from '../../types/auth.interface';
import { sign } from 'jsonwebtoken';
import { RespType } from '~/types/db.interface';
import { Model } from 'sequelize';
import { uploadImg } from './utilityService';
import { Files } from 'formidable';
import { STATUS_OK } from '~/utils/constants';

const config = useRuntimeConfig();

export const AUTH_TIMEOUT = 10;

export async function verifyUser(body: SignInFormBody) {
	try {
		const userExists = await doesSuchDataExist(db.Users, {
			email: body.email,
		});
		return userExists.status;
	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function updateUserProfile(body: UserProfile) {
	try {
		if (!body.id) {
			return {
				status: 403,
				message: 'Unauthorised',
			};
		}
		return await updateUser(body.id!, {
			...body,
		});
	} catch (e) {
		console.log(e);
		return {
			status: 500,
			message: 'Something went wrong',
		};
	}
}

export async function parseBodyToUserTypeAndUploadImage(
	files: Files,
	fields: any,
	user: UserProfile
) {
	const imgPaths: { [key: string]: any } = {};
	let newPath = '';
	if (Object.keys(files || {}).length) {
		if (/image/.test(Object.keys(files).join('_'))) {
			for (const key in files) {
				const old = user?.[key as keyof UserProfile] + '';
				imgPaths[key] = await uploadImg(
					user.id!,
					files[key],
					'/',
					key + `_${Date.now()}`,
					old
				);
			}
		} else {
			newPath = await uploadImg(user.id!, files.image);
		}
	}
	const body: any = {
		...(fields || {}),
		id: user?.id,
	};
	if (newPath) {
		body.image = newPath;
	} else if (Object.keys(imgPaths).length) {
		Object.keys(imgPaths).forEach((key) => {
			body[key] = imgPaths[key];
		});
	}
	return body;
}
export async function getUserById(
	id: string
): Promise<{ status: number; data?: UserProfile; message?: string }> {
	return new Promise((resolve) => {
		db.Users?.findByPk(id, {
			include: {
				all: true,
			},
		})
			.then((data: Model<any, any> | null) => {
				if (data?.dataValues) {
					resolve({
						status: STATUS_OK,
						data: data.dataValues,
					});
				} else {
					resolve({
						status: 400,
						message: 'Failed to get user',
					});
				}
			})
			.catch((e: any) => {
				console.log('fetchUser', e);
				resolve({
					status: 500,
					message: 'Failed to get user',
				});
			});
	});
}
export async function findUser(userId: string) {
	try {
		const resp = await db.Users.findOne({
			where: {
				id: userId,
			},
			include: {
				all: true,
			},
		});
		if (resp?.dataValues) {
			const data = { ...resp.dataValues };
			return {
				status: STATUS_OK,
				message: 'Success',
				data,
			};
		}

		return {
			status: 204,
			message: 'No data',
		};
	} catch (e) {
		console.log(e);
		return {
			status: 500,
			message: 'Something went wrong',
		};
	}
}
export async function fetchUser(
	userId: string
): Promise<{ user?: UserProfile; status: number; message: string }> {
	try {
		if (userId) {
			const userExists = await getUserById(userId);
			if (userExists.status && userExists.data) {
				const user = userExists.data;
				if (user)
					return {
						user,
						status: STATUS_OK,
						message: 'Success',
					};
			}
			return {
				status: 400,
				message: 'User not found',
			};
		} else {
			return {
				status: 403,
				message: 'Unauthorized',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			status: 400,
			message: 'User not found',
		};
	}
}
export async function updateOTPForEmail(field: object, payload: object) {
	const [affectedCount, affectedRows] = await db.Users.update(payload, {
		where: {
			...field,
		},
		returning: true,
	});
	if (affectedRows || affectedCount) {
		return {
			status: STATUS_OK,
			message: 'OTP sent',
		};
	}
	return {
		status: 403,
		message: 'Email is not valid',
	};
}
export async function updateUser(id: string, payload: object) {
	if (id) {
		const [affectedCount, affectedRows] = await db.Users.update(payload, {
			where: {
				id,
			},
			returning: true,
		});
		if (affectedRows || affectedCount) {
			return {
				status: STATUS_OK,
				message: 'Profile updated',
			};
		}
		return {
			status: STATUS_OK,
			message: 'Profile upto date',
		};
	}
	return {
		status: 403,
		message: 'Unauthorised',
	};
}

export async function signUp(body: SignupFormBody) {
	try {
		const valid = validatedAuthInfo(body, true);
		const email = body.username || body.email;
		if (valid) {
			const userExists: RespType = await doesSuchDataExist(db.Users, {
				email,
			});
			if (!userExists.status) {
				try {
					const userdata = {
						firstname: body.firstname,
						lastname: body.lastname || '',
						phone: body.phone || '',
						email,
						password: bcrypt.hashSync(body.password, 8),
						genderId: body.genderId,
						roleId: body.roleId,
						investorTypeId: body.investorTypeId,
					};
					const createdUser = await db.Users?.create(userdata);
					if (createdUser) {
						const user = createdUser.dataValues;
						try {
							const accessToken = sign(
								{
									user_id: user.id,
									email,
								},
								config.JWT_SECRET!,
								{
									expiresIn: '2h',
								}
							);
							user.accessToken = accessToken;
							db.Users.update(
								{
									accessToken,
								},
								{
									where: {
										id: user.id,
									},
								}
							);
						} catch (e) {
							console.log('--->', e);
						}
						if (body.admin) {
							return {
								user,
								status: STATUS_OK,
								message: 'User created successfully',
							};
						}
						return {
							user,
						};
					}
					return {
						status: 409,
						message: 'User already exists',
					};
				} catch (err: any) {
					console.log(err);
					return {
						status: 400,
						message: err.message,
					};
				}
			} else {
				return { status: 409, message: 'User already exists' };
			}
		}
	} catch (e: any) {
		return { status: 400, message: e.message };
	}
}

export async function signIn(body: SignupFormBody) {
	try {
		const valid = validatedAuthInfo(body);

		if (valid) {
			const userExists: RespType = await doesSuchDataExist(db.Users, {
				email: body.username,
			});
			if (userExists.status && userExists.data?.length) {
				try {
					const foundUser = userExists.data[0];
					if (foundUser) {
						const user = foundUser.dataValues;
						const matched = bcrypt.compareSync(body.password, user.password);
						if (matched) {
							const accessToken = sign(
								{
									user_id: user.id,
									email: user.email,
								},
								config.JWT_SECRET!,
								{
									expiresIn: '2h',
								}
							);
							user.accessToken = accessToken;
							db.Users.update(
								{
									accessToken,
								},
								{
									where: {
										id: user.id,
									},
								}
							);
							return {
								message: 'User data',
								user,
								status: STATUS_OK,
							};
						}
						return {
							message: 'Email or password is incorrect',
							status: 401,
						};
					}
					return {
						status: 403,
						message: 'User does not exist',
					};
				} catch (err: any) {
					return {
						status: 403,
						message: err.message,
					};
				}
			} else {
				return { status: 403, message: 'User does not exist' };
			}
		} else {
			return { status: 400, message: 'Please provide valid email' };
		}
	} catch (e: any) {
		return { status: 500, message: e.message };
	}
}
