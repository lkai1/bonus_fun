/** @type {import('next').NextConfig} */
import initDb from './app/utils/database/initDb.js';

let webpackHasRun = false

const nextConfig = {
	experimental: {
		serverExternalPackages: ['sequelize'],
	},
	webpack: (config, { isServer }) => {
		if (isServer && !webpackHasRun) {
			initDb()
			webpackHasRun = true
		}
		return config;
	},
};

export default nextConfig;