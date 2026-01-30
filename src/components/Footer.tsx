"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t-2 border-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-color@2x.png"
              alt="NyaaCat"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Copyright */}
          <p className="text-muted-foreground text-center">
            &copy;{currentYear} {t("copyright")}
          </p>

          {/* Made with love */}
          <p className="text-sm text-muted-foreground">
            {t("madeWith")} <span className="text-primary">❤</span> {t("since")}
          </p>
        </div>
      </div>
    </footer>
  );
}
