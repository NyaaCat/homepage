"use client";

import { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-none border-2 border-black bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_var(--primary)] transition-all"
      >
        <span className="mr-1">🌐</span>
        {localeNames[locale]}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
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
      )}
    </div>
  );
}
