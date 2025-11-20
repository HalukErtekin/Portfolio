import Link from "next/link";
import Particles from "../components/particles";
import HeroSpline from "../components/hero-spline";
import { LanguageSwitcher } from "../components/language-switcher";
import { getDictionary } from "@/i18n/dictionary";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";

const siteUrl = "https://halukertekin.com";

export async function generateMetadata({
	params,
}: {
	params: { locale: Locale };
}): Promise<Metadata> {
	const locale = params.locale;
	const dictionary = getDictionary(locale);
	const title =
		locale === "tr"
			? "Haluk Ertekin | Yazılım Geliştirici"
			: "Haluk Ertekin | Software Developer";
	const description = dictionary.home.description;
	const base = `${siteUrl}/${locale}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: base,
			siteName: dictionary.site.name,
			locale: locale === "tr" ? "tr_TR" : "en_US",
			type: "website",
			images: [
				{
					url: "/og.png",
					width: 1920,
					height: 1080,
					alt: "Haluk Ertekin portfolio preview",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			creator: "@haluk_ertekin",
			images: ["/og.png"],
		},
		alternates: {
			canonical: base,
			languages: {
				en: `${siteUrl}/en`,
				tr: `${siteUrl}/tr`,
			},
		},
	};
}

type PageProps = {
	params: { locale: Locale };
};

export default async function Home({ params }: PageProps) {
	const locale = params.locale;
	const dictionary = getDictionary(locale);

	const navigation = [
		{ name: dictionary.nav.projects, href: `/${locale}/projects` },
		{ name: dictionary.nav.about, href: `/${locale}/about` },
		{ name: dictionary.nav.contact, href: `/${locale}/contact` },
	];

	return (
		<div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<HeroSpline className="pointer-events-none absolute inset-y-[-0%] right-[-10%] hidden lg:block w-[72vw] max-w-[900px] z-0" />
			<nav className="relative z-10 my-6 md:my-12 flex items-center justify-between w-full max-w-4xl px-8">
				<ul className="flex items-center justify-center gap-8">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
						>
							{item.name}
						</Link>
					))}
				</ul>
				<LanguageSwitcher
					locale={locale}
					labels={dictionary.switcher}
				/>
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="py-3.5 px-0.5 relative z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				{dictionary.home.title}
			</h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="relative z-10 my-16 text-center animate-fade-in px-6 max-w-2xl">
				<h2 className="text-lg font-semibold text-zinc-100">
					{dictionary.home.role}
				</h2>
				<p className="mt-4 text-sm leading-6 text-zinc-400">
					{dictionary.home.description}
				</p>
			</div>
		</div>
	);
}
