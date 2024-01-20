import { config } from 'dotenv';
config();

export default defineNuxtConfig({
	runtimeConfig: {
		ORIGIN: process.env.ORIGIN,
		NUXT_SECRET: process.env.NUXT_SECRET,
		API_URL: process.env.API_URL,
		AUTH_NO_SECRET: process.env.AUTH_NO_SECRET,
		JWT_SECRET: process.env.JWT_SECRET,
		JWT_SECRET_TIMEOUT: process.env.JWT_SECRET_TIMEOUT || '7200',
		JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
		JWT_REFRESH_TIMEOUT: process.env.JWT_REFRESH_TIMEOUT || '172800',
		RDB_NAME: process.env.RDB_NAME,
		RDB_PORT: process.env.RDB_PORT,
		RDB_USER: process.env.RDB_USER,
		RDB_PASS: process.env.RDB_PASS,
		RDB_HOST: process.env.RDB_HOST,
		RDB_POOL_MAX: process.env.RDB_POOL_MAX,
		RDB_POOL_MIN: process.env.RDB_POOL_MIN,
		RDB_POOL_ACQUIRE: process.env.RDB_POOL_ACQUIRE,
		RDB_POOL_IDLE: process.env.RDB_POOL_IDLE,
		DB_CURRENT_V: process.env.DB_CURRENT_V,
		DB_OLD_V: process.env.DB_OLD_V,
		DIALECT: process.env.DIALECT,
	},
	modules: ['@nuxt/ui', '@sidebase/nuxt-auth', '@pinia/nuxt'],
	pinia: {
		autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
	},
	css: ['~/assets/scss/style.scss'],
	ui: {
		icons: ['heroicons', 'mdi'],
	},
	build: {
		transpile: ['jsonwebtoken'],
	},
	auth: {
		origin: process.env.ORIGIN,
		enableGlobalAppMiddleware: true,
		basePath: '/api/auth',
	},
	app: {
		head: {
			htmlAttrs: {
				class: 'dark',
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1, user-scalable=no',
			link: [
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com',
				},
			],
		},
	},
	sourcemap: process.env.NODE_ENV === 'development',
});
