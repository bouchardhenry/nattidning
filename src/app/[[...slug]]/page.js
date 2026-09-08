import { StoryblokStory } from '@storyblok/react/rsc';

import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

export default async function Page({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';

	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
		version: storyblokVersion,
	});

	return <StoryblokStory story={data.story} />;
}
