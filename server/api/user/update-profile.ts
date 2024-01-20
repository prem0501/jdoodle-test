import { getServerSession } from '#auth';
import type { UserProfile } from '~/types/auth.interface';
import {
	fetchUser,
	parseBodyToUserTypeAndUploadImage,
	updateUserProfile,
} from '../../services/user';
import { readFiles } from 'h3-formidable';
import { STATUS_OK } from '~/utils/constants';

export default defineEventHandler(async (event) => {
	try {
		const { files, fields } = await readFiles(event, {
			includeFields: true,
		});
		const session = await getServerSession(event);
		let user = session?.user as UserProfile;
		if (!user?.id) {
			return {
				status: 403,
				message: 'Unauthorised',
			};
		}
		if (fields.admin && user) {
			const resp = await fetchUser(fields.id?.toString() || '');
			if (resp.status === STATUS_OK && resp.user) {
				user = resp.user;
			} else {
				return {
					status: 400,
					message: 'User not found',
				};
			}
		}
		const body = await parseBodyToUserTypeAndUploadImage(files, fields, user);
		const resp = await updateUserProfile(body as UserProfile);
		return resp;
	} catch (e) {
		console.log('error in upload', e);
		return {
			status: 500,
			message: 'Something went wrong',
		};
	}
});
