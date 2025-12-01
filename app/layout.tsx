import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { Analytics } from "./components/analytics";

const siteUrl = "https://halukertekin.com";
const siteDescription =
	"Yapay zeka, backend, bulut, veri bilimi, güvenlik ve robotik alanlarında geliştirdiğim projeleri ve teknik notlarımı paylaştığım kişisel portföy.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Haluk Ertekin — Software Developer",
		template: "%s | Haluk Ertekin",
	},
	description: siteDescription,
	keywords: [
		"Haluk Ertekin",
		"yazılım geliştirici",
		"yapay zeka mühendisi",
		"backend developer",
		"bulut mimarisi",
		"siber güvenlik",
		"AWS",
		"Next.js portföy",
		"Veri bilimi projeleri",
		"Türk yazılım mühendisi",
	],
	authors: [{ name: "Haluk Ertekin", url: siteUrl }],
	creator: "Haluk Ertekin",
	publisher: "Haluk Ertekin",
	openGraph: {
		title: "Haluk Ertekin — Software Developer",
		description: siteDescription,
		url: siteUrl,
		siteName: "Haluk Ertekin",
		images: [
			{
				url: "/og.png",
				width: 1920,
				height: 1080,
				alt: "Haluk Ertekin portfolio önizleme görseli",
			},
		],
		locale: "tr_TR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Haluk Ertekin — Software Developer",
		description: siteDescription,
		creator: "@haluk_ertekin",
		images: ["/og.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteUrl,
		languages: {
			en: `${siteUrl}/en`,
			tr: `${siteUrl}/tr`,
		},
	},
	verification: {
		google: "nJ_CjIO8M59UtNVB-uEGWsrwRiHEax5fRJXQmmt2VK4",
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
			{ url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
		],
		shortcut: ["/favicon.ico"],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
	category: "technology",
};

const structuredData = [
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Haluk Ertekin",
		url: siteUrl,
		inLanguage: "tr",
		description: siteDescription,
		potentialAction: {
			"@type": "SearchAction",
			target: `${siteUrl}/search?q={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	},
	{
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
	},
];

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang={defaultLocale} className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
