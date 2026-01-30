"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
  ca: "Català",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative group">
      <button className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-none border-2 border-black bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_var(--primary)] transition-all">
        <span className="mr-1">🌐</span>
        {localeNames[locale]}
      </button>
      <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
        {routing.locales.map((l) => (
          <button
            key={l}
            onClick={() => handleChange(l)}
            className={`block w-full px-4 py-2 text-left text-sm hover:bg-accent whitespace-nowrap ${
              l === locale ? "bg-muted font-medium" : ""
            }`}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
