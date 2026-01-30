"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

const langMap: Record<string, string> = {
  zh: "zh-CN",
  en: "en",
  ja: "ja",
  ca: "ca",
};

export function HtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = langMap[locale] || locale;
  }, [locale]);

  return null;
}
