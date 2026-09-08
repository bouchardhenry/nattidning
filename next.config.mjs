/** @type {import('next').NextConfig} */
const nextConfig = {
	// The following environment variables can be safely exposed to the public bundle.
	// The Storyblok public/preview access token is required for the Visual Editor bridge.
	env: {
		STORYBLOK_DELIVERY_API_TOKEN: process.env.STORYBLOK_DELIVERY_API_TOKEN,
		STORYBLOK_API_BASE_URL: process.env.STORYBLOK_API_BASE_URL,
		STORYBLOK_REGION: process.env.STORYBLOK_REGION,
	},
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'a.storyblok.com' }],
	},
};

export default nextConfig;
