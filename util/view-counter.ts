const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const isDev = process.env.NODE_ENV === "development";

const counts = new Map<string, number>();
const dedupe = new Map<string, number>();

export const buildViewKey = (slug: string) =>
	["pageviews", "projects", slug].join(":");

export function incrementDevView(key: string, dedupeHash?: string): number {
	if (!isDev) return 0;

	const now = Date.now();
	if (dedupeHash) {
		const dedupeKey = `${dedupeHash}:${key}`;
		const expiresAt = dedupe.get(dedupeKey);

		if (expiresAt && expiresAt > now) {
			return counts.get(key) ?? 0;
		}

		dedupe.set(dedupeKey, now + ONE_DAY_MS);
	}

	const next = (counts.get(key) ?? 0) + 1;
	counts.set(key, next);
	return next;
}

export function getDevView(key: string): number {
	if (!isDev) return 0;
	return counts.get(key) ?? 0;
}

export function getDevViews(keys: string[]): number[] {
	if (!isDev) return keys.map(() => 0);
	return keys.map((key) => counts.get(key) ?? 0);
}
