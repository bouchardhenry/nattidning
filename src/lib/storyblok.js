import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import Page from '@/components/Page';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
	},
	apiOptions: {
		/** Set the correct region for your space. https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** Only required when the space was created via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});

/** Use draft content while developing, published content in production. */
export const storyblokVersion =
	process.env.NODE_ENV === 'development' ? 'draft' : 'published';
