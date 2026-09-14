import Link from 'next/link';

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
	const articles = await getAllArticles();
	const [lead, ...rest] = articles;

	return (
		<main className="container">
			<section className="teaser">
				<p className="teaser-eyebrow">Nattidning</p>
				<h1 className="teaser-headline">Läsning för sena kvällar</h1>
				<p className="lead">
					Artiklar om barnböcker, illustration och berättande.
				</p>
			</section>

			{lead && (
				<section className="lead-story">
					<p className="eyebrow">Senast publicerat</p>
					<h2>
						<Link href={`/articles/${lead.slug}`}>{lead.content.title}</Link>
					</h2>
					{lead.content.summary && <p className="lead">{lead.content.summary}</p>}
				</section>
			)}

			<section>
				<div className="section-head">
					<h2>Fler artiklar</h2>
					<Link href="/articles">Alla artiklar →</Link>
				</div>

				<ArticleList
					articles={rest}
					emptyMessage="Inga fler artiklar just nu."
				/>
			</section>
		</main>
	);
}
