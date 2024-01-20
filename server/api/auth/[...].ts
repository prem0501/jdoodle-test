import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
import { fetchUser, signIn } from '../../services/user';
import { STATUS_OK } from '~/utils/constants';
import { UserProfile } from '~/types/auth.interface';
const config = useRuntimeConfig();
export default NuxtAuthHandler({
	pages: {
		signIn: '/login',
		newUser: '/signup',
	},
	secret: config.NUXT_SECRET,
	providers: [
		// @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
		CredentialsProvider.default({
			name: 'Credentials',
			async authorize(credentials: any) {
				const data = await signIn(credentials);
				return data.status === STATUS_OK ? data.user : null;
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.jwt = (user as any).accessToken || '';
				token.id = (user as any).id || '';
				token.role = (user as any).role?.name;
			}
			return Promise.resolve(token);
		},
		session: async ({ session, token }) => {
			if (token.sub) {
				const { user } = await fetchUser(token.sub!);
				(session as any).uid = token.sub;
				if (user) {
					(session.user as UserProfile) = user;
				}
			}
			return Promise.resolve(session);
		},
	},
});
