import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArticleList from '@/components/ArticleList';
import { getAllAuthors, getArticlesByAuthor, getAuthorBySlug } from '@/lib/api';
import { assetAlt, assetDimensions, hasImage } from '@/lib/assets';

// Pre-render a page per author; new authors render on-demand.
export async function generateStaticParams() {
	const authors = await getAllAuthors();
	return authors.map((author) => ({ slug: author.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const author = await getAuthorBySlug(slug);
	if (!author) return {};

	const name = author.content?.name || author.name;
	return {
		title: name,
		description: author.content?.bio?.slice(0, 160),
		alternates: { canonical: `/authors/${slug}` },
	};
}

/**
 * An author page. Article bylines have always linked here, but the route was
 * missing, so every byline click hit the root catch-all and 500'd.
 */
export default async function AuthorPage({ params }) {
	const { slug } = await params;

	const author = await getAuthorBySlug(slug);
	if (!author) notFound();

	const articles = await getArticlesByAuthor(author.uuid);
	const name = author.content?.name || author.name;
	const photo = author.content?.photo;
	const dimensions = assetDimensions(photo);
	// A plain textarea field: blank lines separate paragraphs.
	const paragraphs = author.content?.bio?.split(/\n\s*\n/).filter(Boolean) ?? [];

	return (
		<main className="container">
			<nav className="breadcrumb" aria-label="Brödsmulor">
				<Link href="/authors">← Alla skribenter</Link>
			</nav>

			<header className="author-header">
				{hasImage(photo) && dimensions && (
					<Image
						className="avatar avatar-lg"
						src={photo.filename}
						alt={assetAlt(photo, `Porträtt av ${name}`)}
						width={dimensions.width}
						height={dimensions.height}
						sizes="160px"
						preload
					/>
				)}

				<div>
					<p className="eyebrow">Skribent</p>
					<h1>{name}</h1>
				</div>
			</header>

			{paragraphs.length > 0 && (
				<div className="richtext">
					{paragraphs.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			)}

			<section className="author-articles">
				<h2>Artiklar av {name}</h2>
				<ArticleList
					articles={articles}
					emptyMessage={`${name} har inga publicerade artiklar än.`}
				/>
			</section>
		</main>
	);
}
