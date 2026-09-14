import Link from 'next/link';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<p>© {currentYear} Nattidning</p>

			<nav className="footer-nav" aria-label="Sidfotsmeny">
				<Link href="/articles">Alla artiklar</Link>
				<Link href="/authors">Skribenter</Link>
			</nav>
		</footer>
	);
}
