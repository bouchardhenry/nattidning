import { setComponents } from '@storyblok/react/rsc';

import Page from '@/components/Page';
import FilteredPosts from '@/components/FilteredPosts';

import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok-api';

/**
 * Register the components the Delivery API is allowed to render. `setComponents`
 * merges into a process-wide registry, so importing this module once on the
 * server and once on the client is enough. It lives apart from the client init
 * in `@/lib/storyblok-api` so that `@/lib/api` can use the client without
 * dragging component imports into a cycle
 * (storyblok.js -> FilteredPosts -> api.js -> storyblok-api.js).
 */
setComponents({
	page: Page,
	category: Page,
	'filtered-posts': FilteredPosts,
});

export { getStoryblokApi, storyblokVersion };
