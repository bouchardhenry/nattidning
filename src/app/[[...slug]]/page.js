import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

import StartPage from '@/components/StartPage';
import { getStory } from '@/lib/api';
// Side-effect import: registers the blok -> component map for `StoryblokStory`.
import '@/lib/storyblok';

/**
 * Catch-all for editor-managed pages: `/` renders the `home` story, and any
 * other unmatched path is looked up as a story at the same slug.
 *
 * A path with no story behind it renders the 404 page — the Storyblok client's
 * rejection used to escape, so every unknown URL was a 500. The root is the
 * exception: it falls back to a generated start page rather than 404ing.
 */
async function findStory(slugSegments) {
	const fullSlug = slugSegments?.length ? slugSegments.join('/') : 'home';
	return getStory(fullSlug);
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const story = await findStory(slug);

	if (!story) {
		return slug?.length ? {} : { title: { absolute: 'Nattidning' } };
	}

	return {
		title: story.content?.title || story.name,
		description: story.content?.summary || undefined,
	};
}

export default async function Page({ params }) {
	const { slug } = await params;
	const story = await findStory(slug);

	if (story) return <StoryblokStory story={story} />;

	// No `home` story published yet — show the generated start page instead.
	if (!slug?.length) return <StartPage />;

	notFound();
}
