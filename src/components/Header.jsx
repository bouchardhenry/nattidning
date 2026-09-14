import Link from 'next/link';

import { getAllCategories } from '@/lib/api';

/**
 * Site header. The category list comes from Storyblok so a new category folder
 * shows up in the nav without a code change.
 *
 * The submenu is a `<details>` element: it opens on click for touch and
 * keyboard users, which a hover-only CSS dropdown never did.
 */
export default async function Header() {
	// The header renders inside the root layout, so a throw here would escape to
	// `global-error` and take down every page — including the 404 and error UI.
	// A missing category list is better than a blank site.
	let categories = [];
	try {
		categories = await getAllCategories();
	} catch (error) {
		console.error('Header: could not load categories', error);
	}

	return (
		<header className="site-header">
			<Link href="/" className="site-logo">
				Nattidning
			</Link>

			<nav className="site-nav" aria-label="Huvudmeny">
				<Link href="/">Start</Link>

				<details className="nav-dropdown">
					<summary>Artiklar</summary>

					<ul className="dropdown-menu">
						<li>
							<Link href="/articles">Alla artiklar</Link>
						</li>
						{categories.map((category) => (
							<li key={category.uuid}>
								<Link href={`/categories/${category.slug}`}>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</details>

				<Link href="/authors">Skribenter</Link>
			</nav>
		</header>
	);
}
