import type { Metadata } from "next";
import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const contactDescription =
	"Haluk Ertekin ile Twitter, e-posta veya GitHub üzerinden iletişime geçin.";

export const metadata: Metadata = {
	title: "İletişim | Haluk Ertekin",
	description: contactDescription,
	openGraph: {
		title: "İletişim | Haluk Ertekin",
		description: contactDescription,
		url: "https://halukertekin.com/contact",
		siteName: "Haluk Ertekin",
		locale: "tr_TR",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "İletişim | Haluk Ertekin",
		description: contactDescription,
		creator: "@haluk_ertekin",
	},
	alternates: {
		canonical: "https://halukertekin.com/contact",
	},
};

const socials = [
	{
		icon: <Twitter size={20} />,
		href: "https://twitter.com/haluk_ertekin",
		label: "Twitter",
		handle: "@haluk_ertekin",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:halukertekin1907@gmail.com",
		label: "Email",
		handle: "halukertekin1907@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/HalukErtekin",
		label: "Github",
		handle: "HalukErtekin",
	},
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="w-full space-y-12">
					<div className="max-w-2xl mx-auto text-center space-y-4">
						<h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
							Contact
						</h1>
						<p className="text-sm text-zinc-400 sm:text-base">
							{contactDescription}
						</p>
					</div>
					<div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-3 lg:gap-16">
						{socials.map((s) => (
							<Card key={s.href}>
								<Link
									href={s.href}
									target="_blank"
									rel="noreferrer"
									aria-label={`${s.label} ile iletişime geç`}
									className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
								>
									<span
										className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
										aria-hidden="true"
									/>
									<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
										{s.icon}
									</span>{" "}
									<div className="z-10 flex flex-col items-center">
										<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
											{s.handle}
										</span>
										<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
											{s.label}
										</span>
									</div>
								</Link>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
