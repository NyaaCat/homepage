"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/retroui/Card";
import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QQGroup {
  name: string;
  number: string;
  qrCode: string;
  link: string;
}

interface ServerLink {
  labelKey: string;
  href: string;
  type: "email" | "forum" | "discord" | "telegram" | "qq" | "website" | "steam";
  qqGroup?: QQGroup;
}

interface ServerData {
  nameKey: string;
  descKey: string;
  game: string;
  address?: string;
  links: ServerLink[];
  shadowDefault?: string;
  shadowHover?: string;
}

const qqGroups: Record<string, QQGroup> = {
  kedama1: {
    name: "[NyaaCat] 毛玉線圈物語 #1",
    number: "453868266",
    qrCode: "/qq/qq-kedama1.JPG",
    link: "https://qun.qq.com/universal-share/share?ac=1&authKey=6%2FZlwORiZUb5jbB4d7FxuwWeQkrbZbyELaMt1D4MVGsafJ1Vjm6497vvsa67VeAO&busi_data=eyJncm91cENvZGUiOiI0NTM4NjgyNjYiLCJ0b2tlbiI6ImIzUW4zWkQ5QktRaE1wajJXa09zd1czUFErR25BZDhaaTY0a1Fpa3FPd1FCUk1hU1FFU3ZVQVl4RDdWZVRxWGciLCJ1aW4iOiIzNDI0ODA4Nzg2In0%3D&data=cgYfMlcYsEqT6Gn7AkaQY2edDQ_kipIbZe2milIeBCnNQjahKhALDP55wTdmpioIaOe6eOQcWpkMe3w0karbkg&svctype=4&tempid=h5_group_info",
  },
  kedama2: {
    name: "[NyaaCat] 毛玉線圈物語 #2",
    number: "128202139",
    qrCode: "/qq/qq-kedama2.JPG",
    link: "https://qun.qq.com/universal-share/share?ac=1&authKey=wiNsGRpFPohWXy846NX2sUP6qLCH32TVfIwNy1xhaJzkXWwVOUWYj0mv6U4Ws3rN&busi_data=eyJncm91cENvZGUiOiIxMjgyMDIxMzkiLCJ0b2tlbiI6IjFXWjdpQ1pZTEMxMWtGb0RFNWZSTURoQ3RDdHppUHZVK3lNRDRSeGUzWDhOV0FpbUxudGtMVDJxTFNudCthbUIiLCJ1aW4iOiIzNDI0ODA4Nzg2In0%3D&data=mkIIa6ICAgaNik7RBMpiN51m_fIV3leWfuMSG1bJ_RShaxpEL7I3CO2y5kPQuJmXjJ2gjtfDjODC69vreInl0A&svctype=4&tempid=h5_group_info",
  },
  kedama3: {
    name: "[NyaaCat] nano没吃饱大饭店 #3",
    number: "309457466",
    qrCode: "/qq/qq-kedama3.JPG",
    link: "https://qun.qq.com/universal-share/share?ac=1&authKey=rGeIipEO6dOp1NeN5yoA2vaLW1hCqso%2B05%2F6COqOqM53SaF7TvLRYciDPG%2BJewbn&busi_data=eyJncm91cENvZGUiOiIzMDk0NTc0NjYiLCJ0b2tlbiI6IkVQZXNHdEpDRGtHNlJQazk5eWtPYUZpSnF4a0xQaTRXNWN2Q2xjMUFXajd6d3h1alFVNnV3U1FNTnhjZ3NUT1YiLCJ1aW4iOiIzNDI0ODA4Nzg2In0%3D&data=OXf9OwxYaK9Nk3GTudRxZHEVTLrEtpSq-H1v8cnpPN_RS7NNtv6L-ZgH2v333Vw6OArKuIwp1cedBID0bVTXqA&svctype=4&tempid=h5_group_info",
  },
  terraria: {
    name: "[NyaaCat] 泰拉喵",
    number: "1029724690",
    qrCode: "/qq/qq-terraria.JPG",
    link: "https://qun.qq.com/universal-share/share?ac=1&authKey=TXlJgbkvyFaJkPynoID3CQbmAvn5Ve6XRB0PhK0EipIGFcYwYM73k%2Bl3ZptTG5qh&busi_data=eyJncm91cENvZGUiOiIxMDI5NzI0NjkwIiwidG9rZW4iOiIwbGY3MThGVFJ4b05xbVVneEZEM0xNd1ltcVlJQUxhelBJM0RnWEQ3Q2hwVy9PSlp1b0dSRGw4amRVQXRnaWtuIiwidWluIjoiMzQyNDgwODc4NiJ9&data=kC5gRBXbBjeimlF6ZtyI8mPdGFYLk_LEaARuA77tRGPxxQJ7aFlRBP1qMp38EILDSz2usH4k26Zg820tOWJAVQ&svctype=4&tempid=h5_group_info",
  },
  ror2: {
    name: "[NyaaCat] 雨中暴毙2.1",
    number: "868765209",
    qrCode: "/qq/qq-ror2.JPG",
    link: "https://qun.qq.com/universal-share/share?ac=1&authKey=bac%2B5qj2rwlwgwq5rqsnHSDSn2vHwLm8%2BwFpCOf%2BfubJ1aYYSsVu2LKBbZWCQ4vk&busi_data=eyJncm91cENvZGUiOiI4Njg3NjUyMDkiLCJ0b2tlbiI6InNuanBKZDJGcXB1eUxUTkhSTXh5cVpJTVFaY3ZtMmpUNHZNRC9sdUp3RDdvbHROTy90UmNFZGtpTGRteGtpM1oiLCJ1aW4iOiIzNDI0ODA4Nzg2In0%3D&data=umGG78ReOPr7jeWue-LaQ0-glUvFxA1TUhnmuWdx6n4s8sDCPODtrLn-zuROpPgOaQgUQBDeQXig7vkE4jiI-w&svctype=4&tempid=h5_group_info",
  },
  dst: {
    name: "[NyaaCat] 饥荒喵",
    number: "818980851",
    qrCode: "/qq/qq-dst.JPG",
    link: "https://qm.qq.com/q/PCYn611b6q",
  },
};

const serversData: ServerData[] = [
  {
    nameKey: "nyaacat.name",
    descKey: "nyaacat.description",
    game: "Minecraft",
    address: "play.nyaacat.com",
    links: [
      { labelKey: "links.wiki", href: "https://wiki.nyaa.cat", type: "website" },
      { labelKey: "links.email", href: "mailto:owo@nyaa.cat", type: "email" },
    ],
  },
  {
    nameKey: "kedama.name",
    descKey: "kedama.description",
    game: "Minecraft",
    address: "play.craft.moe",
    links: [
      { labelKey: "links.homepage", href: "https://www.craft.moe", type: "website" },
      { labelKey: "links.forum", href: "https://community.craft.moe", type: "forum" },
      { labelKey: "links.discord", href: "https://discord.gg/JfEtkyB", type: "discord" },
      { labelKey: "links.qqGroup1", href: "#", type: "qq", qqGroup: qqGroups.kedama1 },
      { labelKey: "links.qqGroup2", href: "#", type: "qq", qqGroup: qqGroups.kedama2 },
      { labelKey: "links.qqGroup3", href: "#", type: "qq", qqGroup: qqGroups.kedama3 },
    ],
    shadowHover: "#42b983",
  },
  {
    nameKey: "terraria.name",
    descKey: "terraria.description",
    game: "Terraria",
    links: [
      { labelKey: "links.qqGroup", href: "#", type: "qq", qqGroup: qqGroups.terraria },
      { labelKey: "links.details", href: "https://wiki.nyaa.cat/#/gameservers/terraria", type: "website" },
    ],
    shadowDefault: "#5a453d",
    shadowHover: "#b7e19a",
  },
  {
    nameKey: "ror2.name",
    descKey: "ror2.description",
    game: "Risk of Rain 2",
    links: [
      { labelKey: "links.qqGroup", href: "#", type: "qq", qqGroup: qqGroups.ror2 },
      { labelKey: "links.details", href: "https://wiki.nyaa.cat/#/gameservers/ror2", type: "website" },
    ],
    shadowDefault: "#425161",
    shadowHover: "#efd27b",
  },
  {
    nameKey: "dst.name",
    descKey: "dst.description",
    game: "Don't Starve Together",
    links: [
      { labelKey: "links.qqGroup", href: "#", type: "qq", qqGroup: qqGroups.dst },
    ],
    shadowDefault: "#000",
    shadowHover: "#e1c275",
  },
  {
    nameKey: "more.name",
    descKey: "more.description",
    game: "Various",
    links: [
      { labelKey: "links.wiki", href: "https://wiki.nyaa.cat", type: "website" },
      { labelKey: "links.steam", href: "https://steamcommunity.com/groups/nyaacat", type: "steam" },
    ],
    shadowHover: "#66c0f4",
  },
];

function getLinkIcon(type: ServerLink["type"]) {
  switch (type) {
    case "email":
      return "📧";
    case "forum":
      return "💬";
    case "discord":
      return "🎮";
    case "telegram":
      return "✈️";
    case "qq":
      return "🐧";
    case "steam":
      return "🎮";
    case "website":
    default:
      return "🔗";
  }
}

function getCardStyle(server: ServerData) {
  const defaultShadow = server.shadowDefault || "rgba(0,0,0,0.15)";
  const hoverShadow = server.shadowHover || "var(--primary-light)";

  return {
    "--shadow-default": defaultShadow,
    "--shadow-hover": hoverShadow,
  } as React.CSSProperties;
}

export function Servers() {
  const [selectedQQGroup, setSelectedQQGroup] = useState<QQGroup | null>(null);
  const t = useTranslations("servers");

  function copyToClipboard(text: string, message: string) {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message, {
        description: text,
      });
    });
  }

  return (
    <section id="servers" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Servers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serversData.map((server) => (
            <Card
              key={server.nameKey}
              className="w-full h-full flex flex-col !shadow-[4px_4px_0px_0px_var(--shadow-default)] hover:!shadow-[4px_4px_0px_0px_var(--shadow-hover)]"
              style={getCardStyle(server)}
            >
              <Card.Header>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Card.Title className="text-xl">{t(server.nameKey)}</Card.Title>
                  <Badge variant="outline" size="sm">
                    {server.game}
                  </Badge>
                </div>
                <Card.Description>{t(server.descKey)}</Card.Description>
              </Card.Header>
              <Card.Content className="flex-1 flex flex-col">
                {server.address && (
                  <button
                    onClick={() => copyToClipboard(server.address!, t("addressCopied"))}
                    className="w-full mb-4 text-left group/code"
                  >
                    <div className="text-sm text-muted-foreground mb-1">{t("addressLabel")}</div>
                    <div className="relative bg-zinc-900 border-2 border-black rounded-none p-3 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_var(--shadow-hover)] transition-all">
                      <code className="font-mono text-zinc-100 text-sm">{server.address}</code>
                      <svg
                        className="w-4 h-4 text-zinc-400 group-hover/code:text-zinc-200 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </button>
                )}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {server.links.map((link) =>
                    link.type === "qq" && link.qqGroup ? (
                      <button
                        key={link.labelKey}
                        onClick={() => setSelectedQQGroup(link.qqGroup!)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-none border-2 border-black bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_var(--shadow-hover)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                      >
                        <span className="mr-1">{getLinkIcon(link.type)}</span>
                        {t(link.labelKey)}
                      </button>
                    ) : (
                      <a
                        key={link.labelKey}
                        href={link.href}
                        target={link.type !== "email" ? "_blank" : undefined}
                        rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-none border-2 border-black bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_var(--shadow-hover)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                      >
                        <span className="mr-1">{getLinkIcon(link.type)}</span>
                        {t(link.labelKey)}
                      </a>
                    )
                  )}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>

      {/* QQ Group Dialog */}
      <Dialog open={!!selectedQQGroup} onOpenChange={(open) => !open && setSelectedQQGroup(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedQQGroup?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {selectedQQGroup && (
              <>
                <div className="border-2 border-black rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Image
                    src={selectedQQGroup.qrCode}
                    alt={`${selectedQQGroup.name} QR Code`}
                    width={280}
                    height={280}
                    className="w-[280px] h-[280px] object-contain"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => copyToClipboard(selectedQQGroup.number, t("groupNumberCopied"))}
                  >
                    {t("copyGroupNumber")}: {selectedQQGroup.number}
                  </Button>
                  <Button asChild className="flex-1">
                    <a href={selectedQQGroup.link} target="_blank" rel="noopener noreferrer">
                      {t("openGroupLink")}
                    </a>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
