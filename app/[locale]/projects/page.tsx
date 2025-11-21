import type { Project } from "@/.contentlayer/generated";
import { allProjects } from "contentlayer/generated";
import { Eye } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Card } from "../../components/card";
import { Navigation } from "../../components/nav";
import { Article } from "../../projects/article";
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
		locale === "tr" ? "Projeler | Haluk Ertekin" : "Projects | Haluk Ertekin";
	const description = dictionary.projectsPage.intro.join(" ");
	const base = `${siteUrl}/${locale}/projects`;

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
				en: `${siteUrl}/en/projects`,
				tr: `${siteUrl}/tr/projects`,
			},
		},
	};
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function ProjectsPage({
	params,
}: {
	params: { locale: Locale };
}) {
	const locale = params.locale;
	const dictionary = getDictionary(locale);
	const views: Record<string, number> = {};

	const publishedProjects = allProjects
		.filter((project) => project.published && project.locale === locale)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.NEGATIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.NEGATIVE_INFINITY).getTime(),
		);

	if (publishedProjects.length === 0) {
		return (
			<div className="relative pb-16">
				<Navigation
					locale={locale}
					labels={dictionary.nav}
					switcher={dictionary.switcher}
				/>
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl font-display font-bold tracking-tight text-zinc-100 sm:text-5xl">
						{dictionary.projectsPage.emptyTitle}
					</h1>
					<div className="mt-4 space-y-4 text-base leading-7 text-zinc-400">
						<p>{dictionary.projectsPage.emptyDescription}</p>
						<p>{dictionary.projectsPage.emptyCta}</p>
					</div>
				</div>
			</div>
			</div>
		);
	}

	const prioritizedProjects = [...publishedProjects];
	const featuredSlug = "handwriting-recognition-writer-identification";
	const featuredIndex = prioritizedProjects.findIndex(
		(project) => project.slug === featuredSlug,
	);
	if (featuredIndex > 0) {
		const [highlighted] = prioritizedProjects.splice(featuredIndex, 1);
		prioritizedProjects.unshift(highlighted);
	}

	const [featured, ...rest] = prioritizedProjects;
	const [top2, top3] = rest;
	const remaining = rest.slice(2);

	const columns: Project[][] = Array.from({ length: 3 }, () => []);
	remaining.forEach((project, index) => {
		columns[index % columns.length].push(project);
	});

	return (
		<div className="relative pb-16">
			<Navigation
				locale={locale}
				labels={dictionary.nav}
				switcher={dictionary.switcher}
			/>
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl font-display font-bold tracking-tight text-zinc-100 sm:text-5xl">
						{dictionary.projectsPage.title}
					</h1>
					<div className="mt-4 space-y-4 text-base leading-7 text-zinc-400">
						{dictionary.projectsPage.intro.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					{featured && (
						<Card>
							<Link href={`/${locale}/projects/${featured.slug}`}>
								<article className="relative w-full h-full p-4 md:p-8">
									<div className="flex items-center justify-between gap-2">
										<div className="text-xs text-zinc-100">
											{featured.date ? (
												<time dateTime={new Date(featured.date).toISOString()}>
													{Intl.DateTimeFormat(locale, {
														dateStyle: "medium",
													}).format(new Date(featured.date))}
												</time>
											) : (
												<span>SOON</span>
											)}
										</div>
										<span className="flex items-center gap-1 text-xs text-zinc-500">
											<Eye className="w-4 h-4" />{" "}
											{Intl.NumberFormat("en-US", {
												notation: "compact",
											}).format(views[featured.slug] ?? 0)}
										</span>
									</div>

									<h2
										id="featured-post"
										className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
									>
										{featured.title}
									</h2>
									<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
										{featured.description}
									</p>
									<div className="absolute bottom-4 md:bottom-8">
										<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
											{dictionary.projectPage.readMore}{" "}
											<span aria-hidden="true">&rarr;</span>
										</p>
									</div>
								</article>
							</Link>
						</Card>
					)}

					<div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
						{[top2, top3].filter(Boolean).map((project) => (
							<Card key={project!.slug}>
								<Article
									project={project!}
									views={views[project!.slug] ?? 0}
									locale={locale}
								/>
							</Card>
						))}
					</div>
				</div>
				{remaining.length > 0 && (
					<>
						<div className="hidden w-full h-px md:block bg-zinc-800" />
						<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
							{columns.map((column, columnIndex) => (
								<div key={columnIndex} className="grid grid-cols-1 gap-4">
									{column.map((project) => (
										<Card key={project.slug}>
											<Article
												project={project}
												views={views[project.slug] ?? 0}
												locale={locale}
											/>
										</Card>
									))}
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
