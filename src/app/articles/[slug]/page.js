import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllArticles, getArticleBySlug, resolveAuthor } from '@/lib/api';
import RichText from '@/components/RichText';

// Pre-render one page per published article at build time (L6 – Sek 2).
export async function generateStaticParams() {
	const articles = await getAllArticles();
	return articles.map((article) => ({ slug: article.slug }));
}

// Articles published after the build render on-demand instead of 404ing.
export const dynamicParams = true;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	try {
		const article = await getArticleBySlug(slug);
		return {
			title: article.content.title,
			description: article.content.summary,
		};
	} catch {
		return {};
	}
}

export default async function ArticlePage({ params }) {
	const { slug } = await params;

	let article;
	try {
		// resolve_relations: "article.author" turns the reference into a full story
		article = await getArticleBySlug(slug);
	} catch {
		notFound();
	}

	const { content } = article;
	const author = resolveAuthor(article);

	return (
		<main className="container">
			<p>
				<Link href="/articles">← Alla artiklar</Link>
			</p>

			{content.category && <p className="tag">{content.category}</p>}
			<h1>{content.title}</h1>
			{content.summary && <p className="lead">{content.summary}</p>}

			<RichText doc={content.content} />

			{author && (
				<p className="byline">
					Skriven av{' '}
					<Link href={`/authors/${author.slug}`}>
						{author.content?.name || author.name}
					</Link>
				</p>
			)}
		</main>
	);
}
