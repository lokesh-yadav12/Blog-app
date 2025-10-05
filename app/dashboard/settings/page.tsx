import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, User, Mail, Calendar, Edit3, Save } from "lucide-react";

export default async function DashboardSettingsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Please log in to view settings.</p>
      </main>
    );
  }

  // Get user data
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      articles: {
        select: {
          id: true,
          title: true,
          createdAt: true,
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
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">User not found.</p>
      </main>
    );
  }

  const totalArticles = user.articles.length;
  const recentArticles = user.articles.slice(0, 3);

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and account preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.imageUrl || ""} />
                  <AvatarFallback className="text-lg">
                    {user.name[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    {user.role || "Author"}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.email} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalArticles}</div>
                  <div className="text-sm text-muted-foreground">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {(user as any)?.createdAt ? new Date((user as any).createdAt).getFullYear() : "N/A"}

                  </div>
                  <div className="text-sm text-muted-foreground">Member Since</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {(user as any)?.createdAt ? new Date((user as any).createdAt).getFullYear() : "N/A"}

                  </div>
                  <div className="text-sm text-muted-foreground">Days Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Articles</CardTitle>
            </CardHeader>
            <CardContent>
              {recentArticles.length === 0 ? (
                <p className="text-muted-foreground text-sm">No articles published yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="border-l-2 border-primary/20 pl-3">
                      <h4 className="font-medium text-sm line-clamp-2">{article.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {article.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email Verified</span>
                <Badge variant="secondary" className="ml-auto">Yes</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined</span>
                <span className="ml-auto text-sm">
                  {user.createdAt?.toLocaleDateString() || "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Role</span>
                <Badge variant="secondary" className="ml-auto">
                  {user.role || "Author"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

