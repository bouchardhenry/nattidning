import ArticleList from '@/components/ArticleList';
import { getAllArticles } from '@/lib/api';

/**
 * Generated start page, used when Storyblok has no published `home` story.
 *
 * The starter shipped a `home` story that was never published, so with
 * `version: 'published'` the root fetch 404s and the site had no start page at
 * all in production. Publishing `home` in Storyblok takes precedence over this.
 */
export default async function StartPage() {
	const articles = (await getAllArticles()).slice(0, 4);

	return (
		<main className="container">
			<h1>Välkommen till Nattidning</h1>

			<section>
				<h2>Senaste artiklar</h2>

				<ArticleList
					articles={articles}
					emptyMessage="Inga artiklar publicerade än."
				/>
			</section>
		</main>
	);
}
