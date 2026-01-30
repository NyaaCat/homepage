import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "ja", "ca"],
  defaultLocale: "zh",
});

export type Locale = (typeof routing.locales)[number];
