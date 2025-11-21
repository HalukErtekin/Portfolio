import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Navigation } from "../../components/nav";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

const siteUrl = "https://halukertekin.com";

export async function generateMetadata({
	params,
}: {
	params: { locale: Locale };
}): Promise<Metadata> {
	const locale = params.locale;
	const dictionary = getDictionary(locale);
	const title =
		locale === "tr" ? "Hakkımda | Haluk Ertekin" : "About | Haluk Ertekin";
	const description =
		locale === "tr"
			? "Haluk Ertekin'in yapay zeka, backend, veri bilimi ve güvenlik odağındaki deneyimi."
			: "Haluk Ertekin's experience across AI, backend, data science, and security.";
	const base = `${siteUrl}/${locale}/about`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: base,
			siteName: dictionary.site.name,
			locale: locale === "tr" ? "tr_TR" : "en_US",
			type: "profile",
		},
		twitter: {
			card: "summary",
			title,
			description,
			creator: "@haluk_ertekin",
		},
		alternates: {
			canonical: base,
			languages: {
				en: `${siteUrl}/en/about`,
				tr: `${siteUrl}/tr/about`,
			},
		},
	};
}

export default async function AboutPage({
	params,
}: {
	params: { locale: Locale };
}) {
	const locale = params.locale;
	const dictionary = getDictionary(locale);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Haluk Ertekin",
		jobTitle: "Software Developer",
		url: siteUrl,
		image: `${siteUrl}/og.png`,
		sameAs: [
			"https://github.com/HalukErtekin",
			"https://twitter.com/haluk_ertekin",
		],
		address: {
			"@type": "PostalAddress",
			addressCountry: "TR",
		},
	};

	return (
		<div className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 text-zinc-100">
			<Navigation
				locale={locale}
				labels={dictionary.nav}
				switcher={dictionary.switcher}
			/>
			<main className="px-6 py-24 mx-auto max-w-4xl space-y-12 lg:px-8">
				<section className="space-y-6">
					<h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-zinc-100">
						{dictionary.about.title}
					</h1>
					<div className="mt-4 space-y-4 text-base leading-7 text-zinc-400">
						{dictionary.about.paragraphs.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-white">
						{dictionary.about.linksTitle}
					</h2>
					<ul className="grid gap-4 text-base text-zinc-400 sm:grid-cols-2">
						<li>
							<Link
								href="https://github.com/HalukErtekin"
								target="_blank"
								rel="noreferrer"
								className="underline decoration-zinc-600 hover:decoration-white"
							>
								GitHub — HalukErtekin
							</Link>
						</li>
						<li>
							<Link
								href="https://twitter.com/haluk_ertekin"
								target="_blank"
								rel="noreferrer"
								className="underline decoration-zinc-600 hover:decoration-white"
							>
								Twitter — @haluk_ertekin
							</Link>
						</li>
						<li>
							<Link
								href={`mailto:halukertekin1907@gmail.com`}
								className="underline decoration-zinc-600 hover:decoration-white"
							>
								{dictionary.about.contactLabel}
							</Link>
						</li>
					</ul>
				</section>
			</main>
			<Script
				id="person-json-ld"
				type="application/ld+json"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
		</div>
	);
}
