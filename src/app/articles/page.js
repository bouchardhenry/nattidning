import ArticleList from '@/components/ArticleList';
import { getAllArticles } from '@/lib/api';

export const metadata = {
	title: 'Alla artiklar',
	description: 'Varje artikel i Nattidning, nyast först.',
	alternates: { canonical: '/articles' },
};

/** The article index. Linked from the header — used to 500 because it had no page. */
export default async function ArticlesPage() {
	const articles = await getAllArticles();

	return (
		<main className="container">
			<header className="page-header">
				<p className="eyebrow">Arkiv</p>
				<h1>Alla artiklar</h1>
				<p className="page-count">
					{articles.length} {articles.length === 1 ? 'artikel' : 'artiklar'}
				</p>
			</header>

			<ArticleList articles={articles} />
		</main>
	);
}
