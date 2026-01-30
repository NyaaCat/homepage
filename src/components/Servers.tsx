"use client";

import { useState } from "react";
import Image from "next/image";
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
  label: string;
  href: string;
  type: "email" | "forum" | "discord" | "telegram" | "qq" | "website" | "steam";
  qqGroup?: QQGroup;
}

interface Server {
  name: string;
  game: string;
  description: string;
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
};

const servers: Server[] = [
  {
    name: "喵窝",
    game: "Minecraft",
    description: "永久保存的主世界，混合类型的游戏模式。这里是用于构筑喵窝大陆的通用游戏世界。",
    address: "play.nyaacat.com",
    links: [
      { label: "Wiki", href: "https://wiki.nyaa.cat", type: "website" },
      { label: "邮箱", href: "mailto:owo@nyaa.cat", type: "email" },
    ],
  },
  {
    name: "毛玉线圈物语",
    game: "Minecraft",
    description: "简单、可靠、最小化限制的原版生存体验。无需白名单，使用正版账号即可直接加入。",
    address: "play.craft.moe",
    links: [
      { label: "主页", href: "https://www.craft.moe", type: "website" },
      { label: "论坛", href: "https://community.craft.moe", type: "forum" },
      { label: "Discord", href: "https://discord.gg/JfEtkyB", type: "discord" },
      { label: "QQ 群 #1", href: "#", type: "qq", qqGroup: qqGroups.kedama1 },
      { label: "QQ 群 #2", href: "#", type: "qq", qqGroup: qqGroups.kedama2 },
      { label: "QQ 群 #3", href: "#", type: "qq", qqGroup: qqGroups.kedama3 },
    ],
    shadowHover: "#42b983",
  },
  {
    name: "泰拉喵",
    game: "Terraria",
    description: "社区泰拉瑞亚服务器，提供开荒档和养老档两种游戏体验。",
    links: [
      { label: "QQ群", href: "#", type: "qq", qqGroup: qqGroups.terraria },
      { label: "详情", href: "https://wiki.nyaa.cat/#/gameservers/terraria", type: "website" },
    ],
    shadowDefault: "#5a453d",
    shadowHover: "#b7e19a",
  },
  {
    name: "雨中暴毙 2.1",
    game: "Risk of Rain 2",
    description: "社区 Risk of Rain 2 联机服务器，提供经典模式和无限模式。",
    links: [
      { label: "QQ群", href: "#", type: "qq", qqGroup: qqGroups.ror2 },
      { label: "详情", href: "https://wiki.nyaa.cat/#/gameservers/ror2", type: "website" },
    ],
    shadowDefault: "#425161",
    shadowHover: "#efd27b",
  },
  {
    name: "更多游戏",
    game: "Various",
    description: "玩家自发组织的各类联机活动，包括饥荒联机版、英灵神殿等。详情请关注社区群组。",
    links: [
      { label: "Wiki", href: "https://wiki.nyaa.cat", type: "website" },
      { label: "Steam 社区", href: "https://steamcommunity.com/groups/nyaacat", type: "steam" },
    ],
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

function getCardStyle(server: Server) {
  const defaultShadow = server.shadowDefault || "rgba(0,0,0,0.15)";
  const hoverShadow = server.shadowHover || "var(--primary-light)";

  return {
    "--shadow-default": defaultShadow,
    "--shadow-hover": hoverShadow,
  } as React.CSSProperties;
}

function copyToClipboard(text: string, message: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(message, {
      description: text,
    });
  });
}

export function Servers() {
  const [selectedQQGroup, setSelectedQQGroup] = useState<QQGroup | null>(null);

  return (
    <section id="servers" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">游戏服务器</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            我们运营着多个游戏服务器，欢迎加入
          </p>
        </div>

        {/* Servers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <Card
              key={server.name}
              className="w-full h-full flex flex-col !shadow-[4px_4px_0px_0px_var(--shadow-default)] hover:!shadow-[4px_4px_0px_0px_var(--shadow-hover)]"
              style={getCardStyle(server)}
            >
              <Card.Header>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Card.Title className="text-xl">{server.name}</Card.Title>
                  <Badge variant="outline" size="sm">
                    {server.game}
                  </Badge>
                </div>
                <Card.Description>{server.description}</Card.Description>
              </Card.Header>
              <Card.Content className="flex-1 flex flex-col">
                {server.address && (
                  <button
                    onClick={() => copyToClipboard(server.address!, "服务器地址已复制")}
                    className="w-full mb-4 text-left group/code"
                  >
                    <div className="text-sm text-muted-foreground mb-1">服务器地址（点击复制）</div>
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
                  {server.links.map((link) => (
                    link.type === "qq" && link.qqGroup ? (
                      <button
                        key={link.label}
                        onClick={() => setSelectedQQGroup(link.qqGroup!)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-none border-2 border-black bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_var(--shadow-hover)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                      >
                        <span className="mr-1">{getLinkIcon(link.type)}</span>
                        {link.label}
                      </button>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.type !== "email" ? "_blank" : undefined}
                        rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-none border-2 border-black bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_var(--shadow-hover)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                      >
                        <span className="mr-1">{getLinkIcon(link.type)}</span>
                        {link.label}
                      </a>
                    )
                  ))}
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
                    width={200}
                    height={200}
                    className="w-48 h-48 object-cover"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => copyToClipboard(selectedQQGroup.number, "群号已复制")}
                  >
                    复制群号: {selectedQQGroup.number}
                  </Button>
                  <Button asChild className="flex-1">
                    <a href={selectedQQGroup.link} target="_blank" rel="noopener noreferrer">
                      打开加群链接
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
