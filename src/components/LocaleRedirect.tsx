"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const VALID_LOCALES = ["zh", "en", "ja", "ca"];

function getPreferredLocale(): string | null {
  if (typeof localStorage === "undefined") {
    return null;
  }
  const saved = localStorage.getItem("preferred-locale");
  if (saved && VALID_LOCALES.includes(saved)) {
    return saved;
  }
  return null;
}

function detectBrowserLocale(): string {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const languages = navigator.languages || [navigator.language];

  // Check for Chinese (highest priority)
  const hasChinese = languages.some((lang) =>
    lang.toLowerCase().startsWith("zh")
  );
  if (hasChinese) {
    return "zh";
  }

  // Check for Catalan
  const hasCatalan = languages.some((lang) => {
    const lower = lang.toLowerCase();
    return lower === "ca" || lower.startsWith("ca-");
  });
  if (hasCatalan) {
    return "ca";
  }

  // Check if Japanese is the first priority (before English)
  const firstLang = languages[0]?.toLowerCase() || "";
  if (firstLang.startsWith("ja")) {
    return "ja";
  }

  // For Japanese with lower priority than English, or any other case, show English
  return "en";
}

export function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check saved preference first, then fall back to browser detection
    const locale = getPreferredLocale() || detectBrowserLocale();
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}
