import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

/**
 * Shared Storyblok data helpers. Extend this file as the site grows
 * (list view, author page, category routing, ...).
 */

// Which reference fields the Delivery API should resolve into full stories.
export const RESOLVE_RELATIONS = ['article.author'];

/** Every article, newest first, with the author reference resolved. */
export async function getAllArticles() {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories', {
		version: storyblokVersion,
		content_type: 'article',
		resolve_relations: RESOLVE_RELATIONS,
		per_page: 100,
		sort_by: 'first_published_at:desc',
	});
	return data.stories;
}

/** Every article in a specific category, newest first */
export async function getArticlesByCategory(category) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get('cdn/stories', {
		version: storyblokVersion,
		content_type: 'article',
		resolve_relations: RESOLVE_RELATIONS,
		filter_query: {
			category: {
				in: category,
			},
		},
		per_page: 100,
		sort_by: 'first_published_at:desc',
	});
	return data.stories;
}

/** A single article by its slug (stories live in the articles/ folder). */
export async function getArticleBySlug(slug) {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
		version: storyblokVersion,
		resolve_relations: RESOLVE_RELATIONS,
	});
	return data.story;
}

/**
 * Pull the resolved author story out of an article.
 * When resolve_relations worked, content.author is the full story object;
 * otherwise it is still the raw UUID string (return null in that case).
 */
export function resolveAuthor(article) {
	const author = article?.content?.author;
	return author && typeof author === 'object' ? author : null;
}

export async function getStory(slug) {
    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.get(`cdn/stories/authors/${slug}`, {
        version: storyblokVersion,
    });

    return data.story;
}

export async function getArticlesByAuthor(authorUuid) {
    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.get('cdn/stories', {
        version: storyblokVersion,
        content_type: 'article',
        resolve_relations: RESOLVE_RELATIONS,
        filter_query: {
            author: {
                in: authorUuid,
            },
        },
        per_page: 100,
        sort_by: 'first_published_at:desc',
    });

    return data.stories;
}

export async function getAllAuthors() {
    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.get('cdn/stories', {
        version: storyblokVersion,
        content_type: 'author',
        per_page: 100,
    });

    return data.stories;
}