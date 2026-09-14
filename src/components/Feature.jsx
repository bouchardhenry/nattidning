import { storyblokEditable } from '@storyblok/react/rsc';

/** A single named cell inside a `grid`. */
export default function Feature({ blok }) {
	return (
		<article className="card feature" {...storyblokEditable(blok)}>
			<h3 className="card-title">{blok.name}</h3>
		</article>
	);
}
