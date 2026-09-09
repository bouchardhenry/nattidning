import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

/** Generate a sitemap for the site, including all Storyblok stories. */
export default async function sitemap() {
    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.get(`cdn/stories/`, {
        version: storyblokVersion,
        per_page: 100,
    });

    const storyPages = data.stories
        .filter((story) =>
        ["article", "author", "category"].includes(story.content.component) &&
        story.full_slug !== 'home' // Exclude the home page, which is already included separately
        )
        .map((story) => ({
            url: `${siteUrl}/${story.full_slug}`,
            lastModified: story.updated_at,
        }));

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
        },
        ...storyPages,
    ];
}