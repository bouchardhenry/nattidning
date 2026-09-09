import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok-api';
import { SITE_URL } from '@/lib/site';

// Story components that map to a crawlable URL at `/{full_slug}`.
const INDEXABLE_COMPONENTS = ['article', 'author', 'category'];

/**
 * Fetch every story, following pagination so nothing past the first page is
 * dropped once the space grows beyond `per_page`.
 */
async function getAllStories(storyblokApi) {
	const perPage = 100;
	const stories = [];

	for (let page = 1; ; page += 1) {
		const { data } = await storyblokApi.get('cdn/stories', {
			version: storyblokVersion,
			per_page: perPage,
			page,
		});
		stories.push(...data.stories);
		if (data.stories.length < perPage) break;
	}

	return stories;
}

/** Dynamic sitemap: the site root plus every indexable Storyblok story. */
export default async function sitemap() {
	const storyblokApi = getStoryblokApi();
	const stories = await getAllStories(storyblokApi);

	const storyPages = stories
		.filter((story) => INDEXABLE_COMPONENTS.includes(story.content?.component))
		.map((story) => ({
			url: `${SITE_URL}/${story.full_slug}`,
			lastModified: story.updated_at,
		}));

	return [{ url: SITE_URL, lastModified: new Date() }, ...storyPages];
}
