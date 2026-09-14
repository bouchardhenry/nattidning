import './globals.css';

import StoryblokProvider from '@/components/StoryblokProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/site';

export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'Nattidning',
		template: '%s | Nattidning',
	},
	description: 'Byggd med Storyblok och Next.js.',
	openGraph: {
		siteName: 'Nattidning',
		locale: 'sv_SE',
		type: 'website',
	},
};

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="sv">
				<body>
					<a className="skip-link" href="#innehall">
						Hoppa till innehållet
					</a>

					<Header />

					<div id="innehall">{children}</div>

					<Footer />
				</body>
			</html>
		</StoryblokProvider>
	);
}
