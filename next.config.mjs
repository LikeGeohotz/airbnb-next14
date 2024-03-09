/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'a0.muscache.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 't3.ftcdn.net',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'gommutnlkugkshtvghzl.supabase.co',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
