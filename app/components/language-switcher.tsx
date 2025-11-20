"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

type LanguageSwitcherProps = {
	locale: Locale;
	labels: {
		label: string;
		tr: string;
		en: string;
	};
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

	return (
		<div className="flex items-center gap-2 text-xs text-zinc-400">
			<span className="sr-only">{labels.label}</span>
			{(locales as Locale[]).map((option) => {
				const active = option === locale;
				return (
					<button
						key={option}
						type="button"
						onClick={() => {
							if (!active) {
								router.push(swapLocale(pathname, option));
								router.refresh();
							}
						}}
						className={`px-2 py-1 rounded-md border transition-colors ${
							active
								? "border-zinc-500 text-white"
								: "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
						}`}
						aria-pressed={active}
					>
						{labels[option]}
					</button>
				);
			})}
		</div>
	);
}
