import './globals.css';

import StoryblokProvider from '@/components/StoryblokProvider';
import Header from '@/components/Header';

const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(siteUrl),
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
