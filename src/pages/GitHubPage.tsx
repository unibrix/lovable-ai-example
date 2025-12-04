import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Github, Star, GitFork, Search, ExternalLink, GitCommit } from "lucide-react";
import { toast } from "sonner";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export default function GitHubPage() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isLoadingCommits, setIsLoadingCommits] = useState(false);

  const fetchRepos = async () => {
    if (!username.trim()) {
      toast.error("Please enter a GitHub username");
      return;
    }

    setIsLoadingRepos(true);
    setRepos([]);
    setCommits([]);
    setSelectedRepo("");

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Failed to fetch repositories");
      }

      const data = await response.json();
      setRepos(data);
      toast.success(`Found ${data.length} repositories`);
    } catch (error: any) {
      console.error("GitHub error:", error);
      toast.error(error.message || "Failed to fetch repositories");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const fetchCommits = async (repoName: string) => {
    setIsLoadingCommits(true);
    setSelectedRepo(repoName);
    setCommits([]);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/commits?per_page=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch commits");
      }

      const data = await response.json();
      setCommits(data);
    } catch (error: any) {
      console.error("Commits error:", error);
      toast.error("Failed to fetch commits");
    } finally {
      setIsLoadingCommits(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-sm font-medium mb-4">
            <Github className="h-4 w-4" />
            GitHub Integration
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Explore GitHub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fetch and explore GitHub repositories and commits using the public API. 
            Enter a username to get started.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search User</CardTitle>
            <CardDescription>Enter a GitHub username to explore their repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchRepos();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button type="submit" disabled={isLoadingRepos} className="gap-2">
                {isLoadingRepos ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {repos.length > 0 && (
          <Tabs defaultValue="repos" className="space-y-4">
            <TabsList>
              <TabsTrigger value="repos">Repositories ({repos.length})</TabsTrigger>
              <TabsTrigger value="commits" disabled={!selectedRepo}>
                Commits {selectedRepo && `(${selectedRepo})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repos">
              <div className="grid gap-4 md:grid-cols-2">
                {repos.map((repo) => (
                  <Card key={repo.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{repo.name}</CardTitle>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {repo.description || "No description"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {repo.language && (
                            <Badge variant="secondary">{repo.language}</Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            {repo.forks_count}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchCommits(repo.name)}
                        >
                          View Commits
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commits">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitCommit className="h-5 w-5" />
                    Recent Commits - {selectedRepo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingCommits ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : commits.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <GitCommit className="h-12 w-12 mx-auto mb-4" />
                      <p>No commits found</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {commits.map((commit) => (
                          <div
                            key={commit.sha}
                            className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                          >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <GitCommit className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium line-clamp-2">
                                {commit.commit.message}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {commit.commit.author.name} •{" "}
                                {new Date(commit.commit.author.date).toLocaleDateString()}
                              </p>
                            </div>
                            <a
                              href={commit.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {!isLoadingRepos && repos.length === 0 && username && (
          <div className="text-center py-12 text-muted-foreground">
            <Github className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg font-medium">No repositories found</p>
            <p className="text-sm">Try searching for a different username</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
