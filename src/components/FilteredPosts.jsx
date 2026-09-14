import { storyblokEditable } from '@storyblok/react/rsc';

import ArticleList from '@/components/ArticleList';
import { getArticlesByCategory } from '@/lib/api';

/** A block that lists every article in the category it is configured with. */
export default async function FilteredPosts({ blok }) {
	const articles = await getArticlesByCategory(blok.category);

	return (
		<section {...storyblokEditable(blok)}>
			<header className="page-header">
				<p className="eyebrow">Kategori</p>
				<h1 className="category-title">{blok.category}</h1>
				<p className="page-count">
					{articles.length} {articles.length === 1 ? 'artikel' : 'artiklar'}
				</p>
			</header>

			<ArticleList
				articles={articles}
				emptyMessage="Inga artiklar i den här kategorin än."
			/>
		</section>
	);
}
