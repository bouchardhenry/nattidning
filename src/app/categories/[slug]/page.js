import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

/** A category landing page — a Storyblok story living under `categories/`. */
export default async function CategoryPage({ params }) {
	const { slug } = await params;

	const storyblokApi = getStoryblokApi();

	let story;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/categories/${slug}`, {
			version: storyblokVersion,
		});
		story = data.story;
	} catch {
		notFound();
	}

	return <StoryblokStory story={story} />;
}
