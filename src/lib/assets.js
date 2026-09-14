/** Helpers for Storyblok asset fields and date formatting. */

/**
 * Intrinsic pixel size of a Storyblok asset, read from its CDN filename
 * (`.../f/<space>/<width>x<height>/<hash>/<name>.jpg`). `next/image` needs a
 * width/height pair up front, and Storyblok doesn't return one on the field.
 */
export function assetDimensions(asset) {
	const match = asset?.filename?.match(/\/(\d+)x(\d+)\//);
	if (!match) return null;
	return { width: Number(match[1]), height: Number(match[2]) };
}

/** True when the field holds a usable image (an empty asset field has no filename). */
export function hasImage(asset) {
	return Boolean(asset?.filename);
}

/** Alt text for an asset, falling back to a caller-supplied description. */
export function assetAlt(asset, fallback = '') {
	return asset?.alt || asset?.title || fallback;
}

const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

/** A published date rendered for Swedish readers, or `null` if unpublished. */
export function formatDate(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return dateFormatter.format(date);
}

/** `<time dateTime>` wants a plain ISO date. */
export function isoDate(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toISOString().slice(0, 10);
}
