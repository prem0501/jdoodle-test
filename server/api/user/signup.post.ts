import { signUp } from '../../services/user';
import { validateEmail } from '../../services/validationService';
import { SignupFormBody } from '../../../types/auth.interface';

export default defineEventHandler(async (event) => {
	const body = await readBody<SignupFormBody>(event);
	const valid = validateEmail(body.email);
	if (valid) {
		return await signUp(body);
	} else {
		throw createError({
			statusCode: 400,
			statusMessage: 'Please provide valid email',
		});
	}
});
