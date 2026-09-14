import Link from 'next/link';

import { authorName, resolveAuthor } from '@/lib/api';
import { formatDate, isoDate } from '@/lib/assets';

/**
 * One article in a list. Shared by the article index, the category landing
 * pages and the author pages so every listing looks the same.
 */
export default function ArticleCard({ article, headingLevel: Heading = 'h2' }) {
	const { content } = article;
	const author = resolveAuthor(article);
	const name = authorName(author);
	const published = formatDate(article.first_published_at);

	return (
		<article className="card article-card">
			{content.category && (
				<p className="tag">
					<Link href={`/categories/${content.category}`}>
						{content.category}
					</Link>
				</p>
			)}

			<Heading className="card-title">
				<Link href={`/articles/${article.slug}`}>{content.title}</Link>
			</Heading>

			{content.summary && <p className="card-summary">{content.summary}</p>}

			<p className="card-meta">
				{name && author?.slug && (
					<Link href={`/authors/${author.slug}`}>{name}</Link>
				)}
				{name && published && <span aria-hidden="true"> · </span>}
				{published && (
					<time dateTime={isoDate(article.first_published_at)}>{published}</time>
				)}
			</p>
		</article>
	);
}
