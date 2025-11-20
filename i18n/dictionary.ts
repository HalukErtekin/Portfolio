import { Locale } from "./config";
import en from "../messages/en";
import tr from "../messages/tr";

const dictionaries = {
	tr,
	en,
};

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(locale: Locale) {
	return dictionaries[locale];
}
