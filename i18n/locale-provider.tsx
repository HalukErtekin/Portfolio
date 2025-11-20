"use client";

import React, { createContext, useContext } from "react";
import { Locale, defaultLocale } from "./config";
import { getDictionary } from "./dictionary";

type LocaleContextValue = {
	locale: Locale;
	dictionary: ReturnType<typeof getDictionary>;
};

const LocaleContext = createContext<LocaleContextValue>({
	locale: defaultLocale,
	dictionary: getDictionary(defaultLocale),
});

export function LocaleProvider({
	locale,
	dictionary,
	children,
}: {
	locale: Locale;
	dictionary: ReturnType<typeof getDictionary>;
	children: React.ReactNode;
}) {
	return (
		<LocaleContext.Provider value={{ locale, dictionary }}>
			{children}
		</LocaleContext.Provider>
	);
}

export function useLocaleContext() {
	return useContext(LocaleContext);
}
