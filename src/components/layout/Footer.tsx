import { Sparkles, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-semibold mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>Lovable AI Showcase</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Exploring the capabilities of Lovable and AI-powered development. 
              Built entirely with low-code tools and AI assistance.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">AI Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/text-generation" className="hover:text-foreground transition-colors">Text Generation</Link></li>
              <li><Link to="/image-generation" className="hover:text-foreground transition-colors">Image Generation</Link></li>
              <li><Link to="/chat" className="hover:text-foreground transition-colors">AI Chat</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Integrations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/database" className="hover:text-foreground transition-colors">Database (CRUD)</Link></li>
              <li><Link to="/github" className="hover:text-foreground transition-colors">GitHub API</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive" /> using Lovable
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
