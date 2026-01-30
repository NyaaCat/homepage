import { Card } from "@/components/retroui/Card";

const values = [
  {
    title: "自由",
    description: "尊重每位玩家的游戏方式和创造力",
    icon: "🕊️",
  },
  {
    title: "平等",
    description: "所有人在这里都受到同等的尊重",
    icon: "⚖️",
  },
  {
    title: "开放",
    description: "欢迎来自各地、各行各业的玩家",
    icon: "🌍",
  },
  {
    title: "有爱",
    description: "互帮互助，共同营造温暖的社区氛围",
    icon: "❤️",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">关于社区</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            NyaaCat 从 Minecraft 玩家群体发展而来，是一个开放性、多元化的游戏玩家社区。
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value) => (
            <Card key={value.title} className="w-full">
              <Card.Header>
                <div className="text-4xl mb-2">{value.icon}</div>
                <Card.Title>{value.title}</Card.Title>
                <Card.Description>{value.description}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto">
          <Card className="w-full">
            <Card.Content className="p-6 md:p-8">
              <div className="space-y-4 text-center">
                <p className="text-lg">
                  社区由兴趣驱动，不同的人因同样的爱好而聚集，分享游戏的乐趣。
                </p>
                <p className="text-lg">
                  NyaaCat 是<strong>非营利性社区</strong>，完全公益运营，没有任何收费项目。
                </p>
                <p className="text-muted-foreground">
                  我们相信，美好的社区不需要金钱即可长久存在。
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
