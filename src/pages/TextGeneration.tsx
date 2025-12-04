import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const templates = [
  { value: "story", label: "Short Story", prompt: "Write a short creative story about" },
  { value: "poem", label: "Poem", prompt: "Write a beautiful poem about" },
  { value: "email", label: "Professional Email", prompt: "Write a professional email about" },
  { value: "summary", label: "Summary", prompt: "Summarize the following text:" },
  { value: "custom", label: "Custom Prompt", prompt: "" },
];

export default function TextGeneration() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [template, setTemplate] = useState("story");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setIsLoading(true);
    setOutput("");

    try {
      const selectedTemplate = templates.find(t => t.value === template);
      const fullPrompt = template === "custom" 
        ? input 
        : `${selectedTemplate?.prompt} ${input}`;

      const { data, error } = await supabase.functions.invoke("generate-text", {
        body: { prompt: fullPrompt },
      });

      if (error) throw error;
      
      setOutput(data.text);
      toast.success("Text generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate text");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI Text Generation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Generate Text with AI</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use AI to generate stories, poems, emails, summaries, and more. 
            Select a template or write your own custom prompt.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Select a template and enter your prompt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder={
                  template === "custom"
                    ? "Enter your custom prompt..."
                    : "Enter your topic or text..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="resize-none"
              />

              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !input.trim()}
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
                    Generate Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {output && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Generated Output</CardTitle>
                  <CardDescription>AI-generated content based on your prompt</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-muted/50 whitespace-pre-wrap">
                  {output}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
