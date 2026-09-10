import Link from 'next/link';
import { getAllArticles } from '@/lib/api';

export default async function ArticlesPage() {
    const articles = await getAllArticles();

    return (
        <main>
            <h1>Artiklar</h1>
            {articles.map((article) => (
            <article key={article.uuid}>
            <h2>{article.content.title}</h2>
            <p>{article.content.summary}</p>
            <p>Av: {article.content.author.name}</p>
            <Link href={`/articles/${article.slug}`}>
            Läs artikeln
            </Link>
            </article>
           ))}
        </main>
    );
}