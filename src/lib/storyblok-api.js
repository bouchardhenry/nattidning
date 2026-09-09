import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

/**
 * Low-level Storyblok client. Deliberately imports no app components so it can
 * be pulled into `@/lib/api` (and anything api.js touches) without an import
 * cycle. Component registration lives in `@/lib/storyblok`.
 */
export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	/**
	 * Render a small placeholder instead of throwing when a story references a
	 * block whose component isn't registered yet (blocks land across several PRs,
	 * and the blueprint's demo `home` story still contains a `teaser`).
	 */
	enableFallbackComponent: true,
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
