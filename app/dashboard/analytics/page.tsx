import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, Eye, MessageCircle, Heart, FileText } from "lucide-react";

export default async function DashboardAnalyticsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Please log in to view analytics.</p>
      </main>
    );
  }

  // Get user's articles with their metrics
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      articles: {
        include: {
          comments: true,
          likes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Analytics</h1>
        <p className="text-muted-foreground">User not found.</p>
      </main>
    );
  }

  const articles = user.articles;
  const totalArticles = articles.length;
  const totalComments = articles.reduce((sum, article) => sum + article.comments.length, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likes.length, 0);
  
  // Calculate engagement metrics
  const avgCommentsPerArticle = totalArticles > 0 ? (totalComments / totalArticles).toFixed(1) : "0";
  const avgLikesPerArticle = totalArticles > 0 ? (totalLikes / totalArticles).toFixed(1) : "0";
  
  // Get top performing articles
  const topArticles = articles
    .map(article => ({
      ...article,
      engagementScore: article.comments.length + article.likes.length,
    }))
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, 5);

  // Get recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentArticles = articles.filter(article => article.createdAt >= sevenDaysAgo);
  const recentComments = articles.flatMap(article => 
    article.comments.filter(comment => comment.createdAt >= sevenDaysAgo)
  );
  const recentLikes = articles.flatMap(article => 
    article.likes.filter(like => like.createdAt >= sevenDaysAgo)
  );

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your content performance and engagement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {recentArticles.length} published this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {recentComments.length} this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              {recentLikes.length} this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCommentsPerArticle}</div>
            <p className="text-xs text-muted-foreground">
              comments per article
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Articles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top Performing Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {topArticles.length === 0 ? (
            <div className="text-center py-8">
              <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No articles published yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-bold rounded-full">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Published {article.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{article.comments.length}</div>
                      <div className="text-xs text-muted-foreground">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{article.likes.length}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <Badge variant="secondary">
                      {article.engagementScore} total
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Comments per Article</span>
                <span className="text-lg font-bold">{avgCommentsPerArticle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Likes per Article</span>
                <span className="text-lg font-bold">{avgLikesPerArticle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Engagement</span>
                <span className="text-lg font-bold">{totalComments + totalLikes}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Articles (7 days)</span>
                <span className="text-lg font-bold">{recentArticles.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Comments (7 days)</span>
                <span className="text-lg font-bold">{recentComments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Likes (7 days)</span>
                <span className="text-lg font-bold">{recentLikes.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

