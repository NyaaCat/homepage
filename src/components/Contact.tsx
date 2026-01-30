import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

const contactItems = [
  {
    icon: "💬",
    title: "社区论坛",
    description: "讨论交流、分享作品",
    link: "https://community.craft.moe",
    linkText: "community.craft.moe",
  },
  {
    icon: "📚",
    title: "Wiki 知识库",
    description: "查阅服务器指南和文档",
    link: "https://wiki.nyaa.cat",
    linkText: "wiki.nyaa.cat",
  },
  {
    icon: "📧",
    title: "联系邮箱",
    description: "有任何问题欢迎来信",
    link: "mailto:owo@nyaa.cat",
    linkText: "owo@nyaa.cat",
  },
  {
    icon: "💻",
    title: "GitHub",
    description: "开源项目和贡献",
    link: "https://github.com/NyaaCat",
    linkText: "github.com/NyaaCat",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">联系我们</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            通过以下方式找到我们
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contactItems.map((item) => (
            <Card key={item.title} className="w-full text-center">
              <Card.Header>
                <div className="text-4xl mb-3">{item.icon}</div>
                <Card.Title className="text-lg">{item.title}</Card.Title>
                <Card.Description>{item.description}</Card.Description>
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

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <Card className="w-full bg-accent">
            <Card.Content className="p-6">
              <p className="text-accent-foreground">
                各个游戏服务器可能有独立的群组和联系方式，详情请查看
                <a
                  href="https://wiki.nyaa.cat/#/wiki/groups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline mx-1"
                >
                  玩家群组
                </a>
                页面。
              </p>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
