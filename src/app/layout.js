import './globals.css';

import StoryblokProvider from '@/components/StoryblokProvider';
import Header from '@/components/Header';
import { SITE_URL } from '@/lib/site';

export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'Nattidning',
		template: '%s | Nattidning',
	},
	description: 'Byggd med Storyblok och Next.js.',
};

export default function RootLayout({ children }) {
	const currentYear = new Date().getFullYear();
	return (
		<StoryblokProvider>
			<html lang="sv">
				<body>
					<Header />
					{children}
					<footer>© {currentYear} Nattidning</footer>
				</body>
			</html>
		</StoryblokProvider>
	);
}
