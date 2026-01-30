"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/retroui/Card";

export function About() {
  const t = useTranslations("about");

  const values = [
    { key: "freedom", icon: "🕊️" },
    { key: "equality", icon: "⚖️" },
    { key: "openness", icon: "🌍" },
    { key: "love", icon: "❤️" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">{t("intro")}</p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value) => (
            <Card key={value.key} className="w-full">
              <Card.Header>
                <div className="text-4xl mb-2">{value.icon}</div>
                <Card.Title>{t(`values.${value.key}`)}</Card.Title>
              </Card.Header>
            </Card>
          ))}
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto">
          <Card className="w-full">
            <Card.Content className="p-6 md:p-8">
              <div className="space-y-4 text-center">
                <p className="text-lg">{t("description")}</p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
