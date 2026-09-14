import { getStories } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

// Story components that map to a crawlable URL at `/{full_slug}`.
const INDEXABLE_COMPONENTS = ['article', 'author', 'category'];

// Hand-built routes that have no story behind them.
const STATIC_PATHS = ['/articles', '/authors'];

/** Dynamic sitemap: the site root, the listing pages and every indexable story. */
export default async function sitemap() {
	const stories = await getStories();

	const storyPages = stories
		.filter((story) => INDEXABLE_COMPONENTS.includes(story.content?.component))
		.map((story) => ({
			url: `${SITE_URL}/${story.full_slug}`,
			lastModified: story.updated_at,
		}));

	return [
		{ url: SITE_URL, lastModified: new Date() },
		...STATIC_PATHS.map((path) => ({
			url: `${SITE_URL}${path}`,
			lastModified: new Date(),
		})),
		...storyPages,
	];
}
