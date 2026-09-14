'use client';

import './globals.css';

/**
 * Replaces the root layout when the layout itself throws, so it has to render
 * its own document and pull in the global stylesheet.
 */
export default function GlobalError({ error, retry }) {
	return (
		<html lang="sv">
			<body>
				<title>Något gick fel | Nattidning</title>
				<main className="container">
					<header className="page-header">
						<p className="eyebrow">Fel</p>
						<h1>Något gick fel</h1>
						<p className="lead">Sidan kunde inte visas.</p>
						{error?.digest && <p className="page-count">Ref: {error.digest}</p>}
					</header>

					<p className="actions">
						<button className="button" type="button" onClick={() => retry()}>
							Försök igen
						</button>
					</p>
				</main>
			</body>
		</html>
	);
}
