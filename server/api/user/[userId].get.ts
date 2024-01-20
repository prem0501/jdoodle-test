import { findUser } from '~/server/services/user';

export default defineEventHandler(async (event) => {
	const userId: any = getRouterParam(event, 'userId');
	return findUser(userId);
});
