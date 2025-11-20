import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const siteUrl = "https://halukertekin.com";
const defaultOgImage = "/og.png";

type Props = {
  params: {
    slug: string;
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
    }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const slug = params?.slug;
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Proje bulunamadı | Haluk Ertekin",
      description: "İstenen proje sayfası bulunamadı.",
    };
  }

  const title = `${project.title} | Projeler | Haluk Ertekin`;
  const description =
    project.description ??
    "Haluk Ertekin'in teknik projeleri, kullanılan teknolojiler ve çıktıları.";
  const url = `${siteUrl}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "Haluk Ertekin",
      locale: "tr_TR",
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
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views = redis
    ? ((await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0)
    : 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      {redisEnabled ? <ReportView slug={project.slug} /> : null}

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
