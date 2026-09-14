import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
	authorName,
	getAllArticles,
	getArticleBySlug,
	resolveAuthor,
} from '@/lib/api';
import { formatDate, isoDate } from '@/lib/assets';
import AuthorCard from '@/components/AuthorCard';
import RichText from '@/components/RichText';

// Pre-render one page per published article at build time.
export async function generateStaticParams() {
	const articles = await getAllArticles();
	return articles.map((article) => ({ slug: article.slug }));
}

// Articles published after the build render on-demand instead of 404ing.
export const dynamicParams = true;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);
	if (!article) return {};

	return {
		title: article.content.title,
		description: article.content.summary,
		alternates: { canonical: `/articles/${slug}` },
	};
}

export default async function ArticlePage({ params }) {
	const { slug } = await params;

	// resolve_relations: "article.author" turns the reference into a full story
	const article = await getArticleBySlug(slug);
	if (!article) notFound();

	const { content } = article;
	const author = resolveAuthor(article);
	const published = formatDate(article.first_published_at);

	return (
		<main className="container">
			<nav className="breadcrumb" aria-label="Brödsmulor">
				<Link href="/articles">← Alla artiklar</Link>
			</nav>

			<article className="article">
				<header className="article-header">
					{content.category && (
						<p className="tag">
							<Link href={`/categories/${content.category}`}>
								{content.category}
							</Link>
						</p>
					)}

					<h1>{content.title}</h1>

					{content.summary && <p className="lead">{content.summary}</p>}

					<p className="card-meta">
						{authorName(author) && author?.slug && (
							<Link href={`/authors/${author.slug}`}>{authorName(author)}</Link>
						)}
						{authorName(author) && published && (
							<span aria-hidden="true"> · </span>
						)}
						{published && (
							<time dateTime={isoDate(article.first_published_at)}>
								{published}
							</time>
						)}
					</p>
				</header>

				<RichText doc={content.content} />
			</article>

			{author && <AuthorCard author={author} />}
		</main>
	);
}
