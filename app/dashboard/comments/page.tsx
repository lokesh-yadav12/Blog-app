import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Trash2, Check, X } from "lucide-react";
import { deleteComment } from "@/actions/delete-comment";

export default async function DashboardCommentsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Comments</h1>
        <p className="text-muted-foreground">Please log in to view comments.</p>
      </main>
    );
  }

  // Get user's articles and their comments
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      articles: {
        include: {
          comments: {
            include: {
              author: {
                select: {
                  name: true,
                  email: true,
                  imageUrl: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      },
    },
  });

  if (!user) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Comments</h1>
        <p className="text-muted-foreground">User not found.</p>
      </main>
    );
  }

  const allComments = user.articles.flatMap(article => 
    article.comments.map(comment => ({
      ...comment,
      articleTitle: article.title,
      articleId: article.id,
    }))
  );

  const totalComments = allComments.length;
  const recentComments = allComments.slice(0, 10);

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Comments</h1>
        <p className="text-muted-foreground">Manage comments on your articles</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles with Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.articles.filter(a => a.comments.length > 0).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentComments.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Comments List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {recentComments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No comments yet on your articles.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.imageUrl || ""} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.author.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {comment.articleTitle}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {comment.createdAt.toLocaleDateString()} at {comment.createdAt.toLocaleTimeString()}
                        </p>
                        <p className="text-sm">{comment.body}</p>
                      </div>
                    </div>
                    <form action={deleteComment.bind(null, comment.id)}>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

