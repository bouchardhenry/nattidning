import Image from 'next/image';
import Link from 'next/link';

import { getAllAuthors } from '@/lib/api';
import { assetAlt, assetDimensions, hasImage } from '@/lib/assets';

export const metadata = {
	title: 'Skribenter',
	description: 'Alla skribenter som skriver i Nattidning.',
	alternates: { canonical: '/authors' },
};

export default async function AuthorsPage() {
	const authors = await getAllAuthors();

	return (
		<main className="container">
			<header className="page-header">
				<p className="eyebrow">Redaktion</p>
				<h1>Skribenter</h1>
			</header>

			{authors.length === 0 ? (
				<p className="empty">Inga skribenter än.</p>
			) : (
				<div className="article-list">
					{authors.map((author) => {
						const name = author.content?.name || author.name;
						const photo = author.content?.photo;
						const dimensions = assetDimensions(photo);

						return (
							<article className="card author-tile" key={author.uuid}>
								{hasImage(photo) && dimensions && (
									<Image
										className="avatar"
										src={photo.filename}
										alt={assetAlt(photo, `Porträtt av ${name}`)}
										width={dimensions.width}
										height={dimensions.height}
										sizes="72px"
									/>
								)}
								<h2 className="card-title">
									<Link href={`/authors/${author.slug}`}>{name}</Link>
								</h2>
							</article>
						);
					})}
				</div>
			)}
		</main>
	);
}
