import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  MessageSquare, 
  Image, 
  FileText, 
  Database, 
  Github,
  ArrowRight,
  Zap,
  Palette,
  Code2
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Text Generation",
    description: "Generate creative content, summaries, and more using AI language models.",
    href: "/text-generation",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Image,
    title: "Image Generation",
    description: "Create stunning images from text descriptions using AI image models.",
    href: "/image-generation",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Have conversations with an AI assistant in a ChatGPT-like interface.",
    href: "/chat",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Database,
    title: "Database CRUD",
    description: "Full database integration with create, read, update, and delete operations.",
    href: "/database",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Explore repositories and commits using the GitHub API.",
    href: "/github",
    gradient: "from-slate-500/20 to-zinc-500/20",
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Vite and React for optimal performance.",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Modern UI with dark/light theme support.",
  },
  {
    icon: Code2,
    title: "Low Code",
    description: "Developed entirely with Lovable's AI assistance.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container relative py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Powered by Lovable AI
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Explore AI Capabilities with{" "}
              <span className="text-primary">Lovable</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A comprehensive showcase demonstrating text generation, image creation, 
              AI chat, database operations, and API integrations—all built with low-code tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/chat">
                  Try AI Chat <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/text-generation">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore AI Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each section demonstrates different AI and integration capabilities 
            available through Lovable's platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.href} to={feature.href}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2`}>
                    <feature.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {feature.title}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-gradient-to-b from-card/50 to-background">
        <div className="container py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start creating your own AI-powered applications with Lovable. 
            No complex setup required.
          </p>
          <Button asChild size="lg">
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">
              Get Started with Lovable
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
