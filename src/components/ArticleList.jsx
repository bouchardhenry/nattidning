import ArticleCard from '@/components/ArticleCard';

/** A grid of `ArticleCard`s, with a message when there is nothing to show. */
export default function ArticleList({ articles, emptyMessage = 'Inga artiklar än.' }) {
	if (!articles?.length) {
		return <p className="empty">{emptyMessage}</p>;
	}

	return (
		<div className="article-list">
			{articles.map((article) => (
				<ArticleCard key={article.uuid} article={article} />
			))}
		</div>
	);
}
