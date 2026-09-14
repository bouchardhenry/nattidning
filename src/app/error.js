'use client';

import { useEffect } from 'react';

/**
 * Segment error boundary. Storyblok being unreachable or misconfigured lands
 * here — the 404 case is handled by `notFound()` and `not-found.js` instead.
 *
 * Next 16 passes `retry`, not `reset`.
 */
export default function Error({ error, retry }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="container">
			<header className="page-header">
				<p className="eyebrow">Fel</p>
				<h1>Något gick fel</h1>
				<p className="lead">
					Innehållet kunde inte hämtas just nu. Försök igen om en stund.
				</p>
			</header>

			<p className="actions">
				<button className="button" type="button" onClick={() => retry()}>
					Försök igen
				</button>
			</p>
		</main>
	);
}
