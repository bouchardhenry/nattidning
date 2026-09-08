import { renderRichText } from '@storyblok/react';

/** Renders a Storyblok RichText field to HTML. */
export default function RichText({ doc }) {
	if (!doc) return null;
	const html = renderRichText(doc);
	if (!html) return null;
	return (
		<div className="richtext" dangerouslySetInnerHTML={{ __html: html }} />
	);
}
