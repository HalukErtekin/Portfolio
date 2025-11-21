"use client";
import { ArrowLeft, Eye, Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/app/components/language-switcher";
import { Locale } from "@/i18n/config";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
	};

	views: number;
	locale: Locale;
	switcher: {
		label: string;
		tr: string;
		en: string;
	};
};
export const Header: React.FC<Props> = ({ project, views, locale, switcher }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		const repoHref = project.repository.startsWith("http")
			? project.repository
			: `https://github.com/${project.repository.replace(/^\/+/, "")}`;
		links.push({
			label: "GitHub",
			href: repoHref,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
	const socials = [
		{
			href: "https://twitter.com/haluk_ertekin",
			label: "Follow Haluk on Twitter",
			Icon: Twitter,
		},
		{
			href: "https://github.com/HalukErtekin",
			label: "Haluk on GitHub",
			Icon: Github,
		},
		{
			href: "mailto:halukertekin1907@gmail.com",
			label: "Email Haluk Ertekin",
			Icon: Mail,
		},
	];
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md duration-200 border-b ${
					isIntersecting
						? "bg-zinc-950/70 border-transparent"
						: "bg-zinc-950/90 border-zinc-800/80 shadow-lg"
				}`}
			>
				<div className="container relative flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 mx-auto">
					<Link
						href={`/${locale}/projects`}
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-200 hover:text-white"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>

					<div className="flex-1 flex items-center justify-center gap-3 text-sm px-2 md:gap-7 lg:gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 transition-colors ${
								isIntersecting
									? " text-zinc-300 hover:text-white"
									: "text-zinc-100 hover:text-white"
							} `}
						>
							<Eye className="w-5 h-5 md:w-6 md:h-6" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
						{socials.map(({ href, label, Icon }) => (
							<Link
								key={href}
								target="_blank"
								href={href}
								aria-label={label}
								rel="noreferrer"
							>
								<Icon
									className={`w-5 h-5 md:w-6 md:h-6 duration-200 hover:font-medium transition-colors ${
										isIntersecting
											? " text-zinc-300 hover:text-white"
											: "text-white hover:text-white"
									} `}
								/>
							</Link>
						))}
					</div>

					<div className="shrink-0 md:absolute md:right-6">
						<LanguageSwitcher locale={locale} labels={switcher} />
					</div>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{project.description}
						</p>
					</div>

					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<Link target="_blank" key={link.label} href={link.href}>
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
