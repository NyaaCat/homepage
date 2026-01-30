import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

import zhMessages from "../../../messages/zh.json";
import enMessages from "../../../messages/en.json";
import jaMessages from "../../../messages/ja.json";
import caMessages from "../../../messages/ca.json";

const messages: Record<Locale, typeof zhMessages> = {
  zh: zhMessages,
  en: enMessages,
  ja: jaMessages,
  ca: caMessages,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localeMessages = messages[locale as Locale] || messages.zh;

  return {
    title: localeMessages.metadata.title,
    description: localeMessages.metadata.description,
    keywords: ["NyaaCat", "喵窝", "Minecraft", "游戏社区", "毛玉线圈物语"],
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const langMap: Record<string, string> = {
    zh: "zh-CN",
    en: "en",
    ja: "ja",
    ca: "ca",
  };

  return (
    <html lang={langMap[locale] || locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <NextIntlClientProvider messages={messages[locale as Locale]}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
