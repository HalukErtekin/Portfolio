import Link from "next/link";
import Particles from "../components/particles";
import HeroSpline from "../components/hero-spline";
import { LanguageSwitcher } from "../components/language-switcher";
import { getDictionary } from "@/i18n/dictionary";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Parisienne } from "@next/font/google";

const siteUrl = "https://halukertekin.com";
const parisienne = Parisienne({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

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
			<div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-6 md:right-10 md:top-8">
				<LanguageSwitcher
					locale={locale}
					labels={dictionary.switcher}
				/>
			</div>
			<HeroSpline className="pointer-events-none absolute inset-y-[-0%] right-[-10%] hidden lg:block w-[72vw] max-w-[900px] z-0" />
			<nav className="relative z-10 mt-8 md:mt-14 flex items-center justify-center w-full max-w-4xl px-6">
				<ul className="flex items-center justify-center gap-10 md:gap-12">
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
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="py-3.5 px-0.5 relative z-10 text-5xl text-white duration-1000 cursor-default text-edge-outline animate-title sm:text-6xl md:text-9xl whitespace-nowrap">
				<span className={`${parisienne.className} font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.18)]`}>
					{dictionary.home.title}
				</span>
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
