import Image from 'next/image';
import Link from 'next/link';

import { authorName } from '@/lib/api';
import { assetAlt, assetDimensions, hasImage } from '@/lib/assets';

/** Byline box shown under an article, linking through to the author page. */
export default function AuthorCard({ author }) {
	const name = authorName(author);
	const photo = author.content?.photo;
	const dimensions = assetDimensions(photo);
	const bio = author.content?.bio;
	// The bio is a plain textarea with blank-line paragraphs; show the first one.
	const excerpt = bio?.split(/\n\s*\n/)[0];

	return (
		<aside className="author-card">
			{hasImage(photo) && dimensions && (
				<Image
					className="avatar"
					src={photo.filename}
					alt={assetAlt(photo, name ? `Porträtt av ${name}` : 'Porträtt')}
					width={dimensions.width}
					height={dimensions.height}
					sizes="96px"
				/>
			)}

			<div>
				<p className="eyebrow">Skriven av</p>
				<p className="author-name">
					{author.slug ? (
						<Link href={`/authors/${author.slug}`}>{name}</Link>
					) : (
						name
					)}
				</p>
				{excerpt && <p className="author-bio">{excerpt}</p>}
			</div>
		</aside>
	);
}
