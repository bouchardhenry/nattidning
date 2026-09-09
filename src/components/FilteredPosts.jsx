import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

import { getArticlesByCategory, resolveAuthor } from "@/lib/api";

/** A component to display filtered posts based on a category. */
export default async function FilteredPosts({ blok }) {
    const articles = await getArticlesByCategory(blok.category);

    return (
        <section {...storyblokEditable(blok)}>
            <h1 className="category-title">
                {blok.category}
            </h1>

            {articles.map((article) => {
                const author = resolveAuthor(article);

                return (
                    <article key={article.uuid}>
                        <h2>
                            <Link href={`/articles/${article.slug}`}>
                                {article.content.title}
                            </Link>
                        </h2>

                        <p>{article.content.summary}</p>

                        {author && <p> Av {author.content.name}</p>}
                    </article>
                );
            })}
        </section>
    );
}