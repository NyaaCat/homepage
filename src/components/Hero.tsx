"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/retroui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative bg-primary py-20 md:py-32 border-b-2 border-black overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-secondary border-2 border-black rotate-12 hidden md:block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" />
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent border-2 border-black -rotate-6 hidden md:block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" />
      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-card border-2 border-black rotate-45 hidden lg:block shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="bg-card border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all inline-block rounded-none">
              <Image
                src="/logo-color@2x.png"
                alt="NyaaCat Logo"
                width={160}
                height={80}
                className="h-20 w-auto"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="hover:!shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)]" asChild>
              <a href="#about">{t("learnMore")}</a>
            </Button>
            <Button size="lg" variant="outline" className="hover:!shadow-[4px_4px_0px_0px_var(--secondary)]" asChild>
              <a href="#servers">{t("viewServers")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
