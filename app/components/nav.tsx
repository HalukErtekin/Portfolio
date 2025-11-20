"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { Locale } from "@/i18n/config";

type NavigationProps = {
	locale: Locale;
	labels: {
		projects: string;
		about: string;
		contact: string;
	};
	switcher: {
		label: string;
		tr: string;
		en: string;
	};
};

export const Navigation: React.FC<NavigationProps> = ({
	locale,
	labels,
	switcher,
}) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
		>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex items-center gap-6">
						<LanguageSwitcher locale={locale} labels={switcher} />
						<div className="flex justify-between gap-6">
							<Link
								href={`/${locale}/projects`}
								className="duration-200 text-zinc-400 hover:text-zinc-100"
							>
								{labels.projects}
							</Link>
							<Link
								href={`/${locale}/about`}
								className="duration-200 text-zinc-400 hover:text-zinc-100"
							>
								{labels.about}
							</Link>
							<Link
								href={`/${locale}/contact`}
								className="duration-200 text-zinc-400 hover:text-zinc-100"
							>
								{labels.contact}
							</Link>
						</div>
					</div>

					<Link
						href={`/${locale}`}
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
