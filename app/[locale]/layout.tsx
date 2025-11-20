import { notFound } from "next/navigation";
import { Locale, locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { LocaleProvider } from "@/i18n/locale-provider";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: Locale };
}) {
	const locale = params.locale;
	if (!isLocale(locale)) {
		notFound();
	}
	const dictionary = getDictionary(locale);

	return (
		<LocaleProvider locale={locale} dictionary={dictionary}>
			{children}
		</LocaleProvider>
	);
}
