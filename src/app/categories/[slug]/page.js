import { StoryblokStory } from '@storyblok/react/rsc';

import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

/** A category page, which is a Storyblok story with a slug like `category/slug`. */
export default async function CategoryPage({ params }) {
    const { slug } = await params;

    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.get(`cdn/stories/`, {
        version: storyblokVersion,
        starts_with: 'categories/',
    });

    const story = data.stories.find(
        (story) => story.full_slug === `categories/${slug}`
    )

    return <StoryblokStory story={story} />;
}