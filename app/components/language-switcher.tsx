"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

type LanguageSwitcherProps = {
	locale: Locale;
	labels: { label: string } & Record<Locale, string>;
};

const languageCycle: Record<Locale, Locale> = {
	en: "tr",
	tr: "en",
};

function swapLocale(pathname: string, targetLocale: Locale) {
	const segments = pathname.split("/");
	// ["", "tr", "projects"...]
	if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
		segments[1] = targetLocale;
		return segments.join("/") || "/";
	}
	return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
	const router = useRouter();
	const pathname = usePathname() || "/";
	const nextLocale = languageCycle[locale];

	return (
		<button
			type="button"
			onClick={() => {
				router.push(swapLocale(pathname, nextLocale));
				router.refresh();
			}}
			aria-label={`${labels.label}: ${labels[nextLocale]}`}
			className="inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-black/60 px-2.5 py-0.5 text-[10px] text-zinc-300 shadow-lg backdrop-blur transition hover:border-zinc-500 hover:text-white sm:px-3 sm:py-1"
		>
			<span
				className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold transition sm:px-2 sm:py-0.5 ${
					locale === "en"
						? "bg-zinc-100 text-black"
						: "bg-zinc-900/60 text-zinc-300"
				}`}
			>
				{labels.en}
			</span>
			<span className="text-zinc-700 text-[11px]">/</span>
			<span
				className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold transition sm:px-2 sm:py-0.5 ${
					locale === "tr"
						? "bg-zinc-100 text-black"
						: "bg-zinc-900/60 text-zinc-300"
				}`}
			>
				{labels.tr}
			</span>
		</button>
	);
}
