import { StoryblokServerComponent, storyblokEditable } from '@storyblok/react/rsc';

/** Lays its nested `columns` blocks out side by side. */
export default function Grid({ blok }) {
	return (
		<section className="grid" {...storyblokEditable(blok)}>
			{blok.columns?.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))}
		</section>
	);
}
