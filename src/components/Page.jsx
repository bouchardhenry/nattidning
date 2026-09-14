import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

/** Generic page content type — renders whatever blocks sit in `body`. */
const Page = ({ blok }) => (
	<main className="container" {...storyblokEditable(blok)}>
		{blok.body?.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</main>
);

export default Page;
