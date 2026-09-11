
import { StoryblokStory } from '@storyblok/react/rsc';

import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

import Home from '@/components/Home';

export default async function Page({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';
	if (fullSlug === 'home') {
    return <Home />;
}

	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
		version: storyblokVersion,
	});

	return <StoryblokStory story={data.story} />;
}
