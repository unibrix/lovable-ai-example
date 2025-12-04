import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ImageIcon, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const examplePrompts = [
  "A serene Japanese garden with cherry blossoms",
  "Futuristic city skyline at sunset",
  "Cozy cabin in snowy mountains",
  "Abstract art with vibrant colors",
];

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setIsLoading(true);
    setImageUrl("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt },
      });

      if (error) throw error;
      
      setImageUrl(data.imageUrl);
      toast.success("Image generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started!");
  };

  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <ImageIcon className="h-4 w-4" />
            AI Image Generation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Create Images with AI</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into stunning visuals. Describe what you want to see 
            and let AI bring it to life.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Image</CardTitle>
              <CardDescription>Be as detailed as possible for better results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="A majestic dragon flying over a medieval castle..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />

              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !prompt.trim()}
                className="w-full gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  {imageUrl ? "Your AI-generated image" : "Your image will appear here"}
                </CardDescription>
              </div>
              {imageUrl && (
                <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin" />
                    <p>Creating your masterpiece...</p>
                  </div>
                ) : imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Generated image" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <ImageIcon className="h-16 w-16" />
                    <p>Enter a prompt to generate an image</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
