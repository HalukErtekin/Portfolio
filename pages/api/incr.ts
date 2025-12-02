import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { buildViewKey, incrementDevView } from "@/util/view-counter";

const redis =
	process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
		? Redis.fromEnv()
		: null;
export const config = {
	runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
	if (req.method !== "POST") {
		return new NextResponse("use POST", { status: 405 });
	}

	const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
	if (!contentType.includes("application/json")) {
		return new NextResponse("must be json", { status: 400 });
	}

	let slug: string | undefined;
	try {
		const body = await req.json();
		slug = typeof body.slug === "string" ? body.slug : undefined;
	} catch (error) {
		return new NextResponse("invalid json", { status: 400 });
	}

	if (!slug) {
		return new NextResponse("Slug not found", { status: 400 });
	}

	const key = buildViewKey(slug);
	const ip =
		req.ip ??
		req.headers.get("x-real-ip") ??
		req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
	const ipHash = ip
		? Array.from(
				new Uint8Array(
					await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip)),
				),
		  )
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("")
		: undefined;

	if (!redis) {
		const devCount = incrementDevView(key, ipHash);
		return new NextResponse(JSON.stringify({ views: devCount }), {
			status: 202,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (ip && ipHash) {
		// deduplicate the ip for each slug
		const isNew = await redis.set(
			["deduplicate", ipHash, slug].join(":"),
			true,
			{
				nx: true,
				ex: 24 * 60 * 60,
			},
		);
		if (!isNew) {
			return new NextResponse(null, { status: 202 });
		}
	}

	const total = await redis.incr(key);
	return new NextResponse(JSON.stringify({ views: total }), {
		status: 202,
		headers: { "Content-Type": "application/json" },
	});
}
