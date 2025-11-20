import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "./i18n/config";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip next internals and static assets
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.includes(".") // files with extensions
	) {
		return NextResponse.next();
	}

	const segments = pathname.split("/").filter(Boolean);
	const localeFromPath = segments[0];

	if (!localeFromPath || !isLocale(localeFromPath)) {
		const locale = defaultLocale;
		const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
		return NextResponse.redirect(redirectUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next|favicon.ico|apple-touch-icon.png|site.webmanifest|sitemap.*|robots.txt|web-app-manifest-192x192.png|web-app-manifest-512x512.png|og.png|fonts).*)",
	],
};
