"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

export function Contact() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      icon: "💬",
      titleKey: "forum",
      descKey: "forumDesc",
      link: "https://community.craft.moe",
      linkText: "community.craft.moe",
    },
    {
      icon: "📚",
      titleKey: "wiki",
      descKey: "wikiDesc",
      link: "https://wiki.nyaa.cat",
      linkText: "wiki.nyaa.cat",
    },
    {
      icon: "📧",
      titleKey: "email",
      descKey: "emailDesc",
      link: "mailto:owo@nyaa.cat",
      linkText: "owo@nyaa.cat",
    },
    {
      icon: "💻",
      titleKey: "github",
      descKey: "githubDesc",
      link: "https://github.com/NyaaCat",
      linkText: "github.com/NyaaCat",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contactItems.map((item) => (
            <Card key={item.titleKey} className="w-full text-center">
              <Card.Header>
                <div className="text-4xl mb-3">{item.icon}</div>
                <Card.Title className="text-lg">{t(item.titleKey)}</Card.Title>
                <Card.Description>{t(item.descKey)}</Card.Description>
              </Card.Header>
              <Card.Content>
                <Button variant="link" asChild className="text-primary">
                  <a
                    href={item.link}
                    target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  >
                    {item.linkText}
                  </a>
                </Button>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
