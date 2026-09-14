import { storyblokEditable } from '@storyblok/react/rsc';

/** Hero block — a single headline introducing the page. */
export default function Teaser({ blok }) {
	return (
		<section className="teaser" {...storyblokEditable(blok)}>
			<p className="teaser-eyebrow">Nattidning</p>
			<h1 className="teaser-headline">{blok.headline}</h1>
		</section>
	);
}
