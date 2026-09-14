import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok-api';

/**
 * Shared Storyblok data helpers.
 *
 * Imports the client from `@/lib/storyblok-api` rather than `@/lib/storyblok`
 * so component modules (which import this file) don't form a cycle.
 */

// Which reference fields the Delivery API should resolve into full stories.
export const RESOLVE_RELATIONS = ['article.author'];

/** Pull the HTTP status out of a storyblok-js-client rejection (`ISbError`). */
function errorStatus(error) {
	return error?.status ?? error?.response?.status;
}

/**
 * Fetch a single story, returning `null` when Storyblok says it doesn't exist.
 *
 * Anything other than a 404 is re-thrown: a bad token or an outage must surface
 * as an error page, not be mistaken for missing content.
 */
export async function getStory(slug, params = {}) {
	const storyblokApi = getStoryblokApi();
	try {
		const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: storyblokVersion,
			...params,
		});
		return data.story;
	} catch (error) {
		if (errorStatus(error) === 404) return null;
		throw error;
	}
}

/** Fetch a list of stories, following pagination past the first page. */
export async function getStories(params = {}) {
	const storyblokApi = getStoryblokApi();
	const perPage = params.per_page ?? 100;
	const stories = [];

	for (let page = 1; ; page += 1) {
		const { data } = await storyblokApi.get('cdn/stories', {
			version: storyblokVersion,
			...params,
			per_page: perPage,
			page,
		});
		stories.push(...data.stories);
		if (data.stories.length < perPage) break;
	}

	return stories;
}

/** Every article, newest first, with the author reference resolved. */
export async function getAllArticles() {
	return getStories({
		content_type: 'article',
		resolve_relations: RESOLVE_RELATIONS,
		sort_by: 'first_published_at:desc',
	});
}

/**
 * Every article in a specific category, newest first.
 * `category` is a plain-text field on the article holding the category slug
 * (e.g. "nyheter"), so `in` matches it against the single requested value.
 */
export async function getArticlesByCategory(category) {
	if (!category) return [];

	return getStories({
		content_type: 'article',
		resolve_relations: RESOLVE_RELATIONS,
		filter_query: { category: { in: category } },
		sort_by: 'first_published_at:desc',
	});
}

/** Every article written by one author (matched on the author story's UUID). */
export async function getArticlesByAuthor(authorUuid) {
	if (!authorUuid) return [];

	return getStories({
		content_type: 'article',
		resolve_relations: RESOLVE_RELATIONS,
		filter_query: { author: { in: authorUuid } },
		sort_by: 'first_published_at:desc',
	});
}

/** A single article by its slug, or `null` (stories live in `articles/`). */
export async function getArticleBySlug(slug) {
	return getStory(`articles/${slug}`, {
		resolve_relations: RESOLVE_RELATIONS,
	});
}

/** Every author, alphabetically by story name. */
export async function getAllAuthors() {
	return getStories({ content_type: 'author', sort_by: 'name:asc' });
}

/** A single author by slug, or `null` (stories live in `authors/`). */
export async function getAuthorBySlug(slug) {
	return getStory(`authors/${slug}`);
}

/** Every category landing page, alphabetically by story name. */
export async function getAllCategories() {
	return getStories({ content_type: 'category', sort_by: 'name:asc' });
}

/** A single category landing page by slug, or `null`. */
export async function getCategoryBySlug(slug) {
	return getStory(`categories/${slug}`);
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

/** The author's display name, whichever shape the reference came back in. */
export function authorName(author) {
	return author?.content?.name || author?.name || null;
}
