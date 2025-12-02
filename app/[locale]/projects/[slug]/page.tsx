import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "@/app/projects/[slug]/header";
import { ReportView } from "@/app/projects/[slug]/view";
import { Redis } from "@upstash/redis";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { buildViewKey, getDevView } from "@/util/view-counter";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const siteUrl = "https://halukertekin.com";
const defaultOgImage = "/og.png";

type Props = {
	params: {
		slug: string;
		locale: Locale;
	};
};

const redisEnabled =
	!!process.env.UPSTASH_REDIS_REST_URL &&
	!!process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisEnabled ? Redis.fromEnv() : null;

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
			locale: p.locale as Locale,
		}));
}

export async function generateMetadata({
	params,
}: Props): Promise<Metadata> {
	const { slug, locale } = params;
	const project = allProjects.find(
		(item) => item.slug === slug && item.locale === locale,
	);

	if (!project) {
		return {
			title: "Proje bulunamadı | Haluk Ertekin",
			description: "İstenen proje sayfası bulunamadı.",
		};
	}

	const title =
		locale === "tr"
			? `${project.title} | Projeler | Haluk Ertekin`
			: `${project.title} | Projects | Haluk Ertekin`;
	const description =
		project.description ??
		(locale === "tr"
			? "Haluk Ertekin'in teknik projeleri, kullanılan teknolojiler ve çıktıları."
			: "Technical projects by Haluk Ertekin, including stack and outcomes.");
	const url = `${siteUrl}/${locale}/projects/${project.slug}`;

	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: {
				en: `${siteUrl}/en/projects/${project.slug}`,
				tr: `${siteUrl}/tr/projects/${project.slug}`,
			},
		},
		openGraph: {
			title,
			description,
			type: "article",
			url,
			siteName: "Haluk Ertekin",
			locale: locale === "tr" ? "tr_TR" : "en_US",
			images: [
				{
					url: defaultOgImage,
					width: 1920,
					height: 1080,
					alt: `${project.title} kapak görseli`,
				},
			],
			publishedTime: project.date
				? new Date(project.date).toISOString()
				: undefined,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			creator: "@haluk_ertekin",
			images: [defaultOgImage],
		},
	};
}

export default async function PostPage({ params }: Props) {
	const { slug, locale } = params;
	const dictionary = getDictionary(locale);
	const project = allProjects.find(
		(item) => item.slug === slug && item.locale === locale,
	);

	if (!project) {
		notFound();
	}
	const resolvedProject = project;

	const key = buildViewKey(slug);
	const views = redis ? (await redis.get<number>(key)) ?? 0 : getDevView(key);

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header
				project={resolvedProject}
				views={views}
				locale={locale}
				switcher={dictionary.switcher}
			/>
			{redisEnabled ? <ReportView slug={resolvedProject.slug} /> : null}

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless [&_pre]:bg-neutral-950 [&_pre]:!bg-opacity-100 [&_pre]:shadow-none [&_pre]:border [&_pre]:border-neutral-800 [&_pre_code]:!bg-transparent [&_pre_code]:!shadow-none [&_pre_code]:!border-0">
				<Mdx code={resolvedProject.body.code} />
			</article>
		</div>
	);
}
