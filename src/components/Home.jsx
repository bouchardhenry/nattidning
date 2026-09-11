import Link from "next/link";
import { getAllArticles } from "@/lib/api";

export default async function Home() {
    const articles = (await getAllArticles()).slice(0, 4);

    return (
        <main>
            <h1>Välkommen till Nattidning</h1>

            <section>
    <h2>Senaste artiklar</h2>

    <div className="article-grid">
        {articles.map((article) => (
            <article key={article.uuid}>
                <h3>
                    <Link href={`/articles/${article.slug}`}>
                        {article.content.title}
                    </Link>
                </h3>

                <p>{article.content.summary}</p>

                <p>
                    Av: {article.content.author.name}
                </p>
            </article>
        ))}
    </div>
  </section>
        </main>
    );
}