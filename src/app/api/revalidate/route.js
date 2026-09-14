import { revalidatePath } from 'next/cache';

/**
 * Storyblok webhook target, referenced by `STORYBLOK_REVALIDATE_SECRET` in
 * `.env.example`. Point a Storyblok story-published webhook at
 * `POST /api/revalidate?secret=...` to drop the cached pages for that story.
 *
 * The webhook body carries `{ story_id, full_slug, action }`; `full_slug` is
 * what tells us which paths to invalidate.
 */

/** Listings that can change whenever any story does. */
const ALWAYS = ['/', '/articles', '/authors', '/sitemap.xml'];

/** Paths that render the story at `fullSlug`, and so need re-rendering. */
function pathsFor(fullSlug) {
	const paths = new Set(ALWAYS);
	if (!fullSlug) return [...paths];

	paths.add(`/${fullSlug}`);

	const [folder, slug] = fullSlug.split('/');

	if (folder === 'articles' && slug) {
		// Category and author pages list this article's title and summary.
		paths.add('/categories/[slug]');
		paths.add('/authors/[slug]');
	} else if (folder === 'authors' && slug) {
		// Every article renders this author's name in its byline.
		paths.add('/articles/[slug]');
	}

	return [...paths];
}

export async function POST(request) {
	const secret = process.env.STORYBLOK_REVALIDATE_SECRET;

	// Without a configured secret the endpoint would be an open cache-buster.
	if (!secret) {
		return Response.json(
			{ revalidated: false, message: 'STORYBLOK_REVALIDATE_SECRET is not set' },
			{ status: 503 },
		);
	}

	if (request.nextUrl.searchParams.get('secret') !== secret) {
		return Response.json(
			{ revalidated: false, message: 'Invalid secret' },
			{ status: 401 },
		);
	}

	let body = {};
	try {
		body = await request.json();
	} catch {
		// A ping with no body still gets the listings refreshed.
	}

	const fullSlug = typeof body.full_slug === 'string' ? body.full_slug : null;
	const paths = pathsFor(fullSlug);

	for (const path of paths) {
		// A bracketed path is a route pattern, which requires the 'page' type.
		revalidatePath(path, path.includes('[') ? 'page' : undefined);
	}

	return Response.json({ revalidated: true, story: fullSlug, paths });
}
