import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

import { getAllCategories, getCategoryBySlug } from '@/lib/api';
// Side-effect import: registers the blok -> component map for `StoryblokStory`.
import '@/lib/storyblok';

// Pre-render a page per category; new categories render on-demand.
export async function generateStaticParams() {
	const categories = await getAllCategories();
	return categories.map((category) => ({ slug: category.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const category = await getCategoryBySlug(slug);
	if (!category) return {};

	return {
		title: category.name,
		description: `Artiklar i kategorin ${category.name}.`,
		alternates: { canonical: `/categories/${slug}` },
	};
}

/** A category landing page — a Storyblok story living under `categories/`. */
export default async function CategoryPage({ params }) {
	const { slug } = await params;

	const story = await getCategoryBySlug(slug);
	if (!story) notFound();

	return <StoryblokStory story={story} />;
}
