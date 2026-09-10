import { getStory, getArticlesByAuthor, getAllAuthors } from '@/lib/api';

export async function generateStaticParams() {
    const authors = await getAllAuthors();

    return authors.map((author) => ({
        slug: author.slug,
    }));
}

export default async function AuthorPage({ params }) {
    const { slug } = await params;

    const authorStory = await getStory(slug);

    const articles = await getArticlesByAuthor(authorStory.uuid);

    return (
        <main>
            <h1>{authorStory.content.name}</h1>

            {authorStory.content.photo?.filename && (
                <img
                    src={authorStory.content.photo.filename}
                    alt={authorStory.content.name}
                />
            )}

            <p>{authorStory.content.bio}</p>

            <h2>Artiklar</h2>

            {articles.map((article) => (
                <article key={article.uuid}>
                    <h3>{article.content.title}</h3>
                    <p>{article.content.summary}</p>
                </article>
            ))}
        </main>
    );
}