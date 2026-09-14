import Link from 'next/link';

export const metadata = { title: 'Sidan finns inte' };

export default function NotFound() {
	return (
		<main className="container">
			<header className="page-header">
				<p className="eyebrow">404</p>
				<h1>Sidan finns inte</h1>
				<p className="lead">
					Länken kan vara gammal, eller så har innehållet flyttat.
				</p>
			</header>

			<p className="actions">
				<Link className="button" href="/">
					Till startsidan
				</Link>
				<Link className="button button-secondary" href="/articles">
					Alla artiklar
				</Link>
			</p>
		</main>
	);
}
