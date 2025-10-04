export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Loading skeleton for article header */}
          <header className="mb-12">
            <div className="mb-4">
              <div className="h-6 w-24 bg-muted animate-pulse rounded-full"></div>
            </div>
            <div className="h-12 w-full bg-muted animate-pulse rounded mb-4"></div>
            <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4"></div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>
              <div className="h-4 w-40 bg-muted animate-pulse rounded"></div>
            </div>
          </header>

          {/* Loading skeleton for article content */}
          <section className="mb-12">
            <div className="space-y-4">
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded"></div>
            </div>
          </section>

          {/* Loading skeleton for actions */}
          <div className="mb-12 border-t pt-8">
            <div className="flex gap-4">
              <div className="h-10 w-20 bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-16 bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-16 bg-muted animate-pulse rounded"></div>
            </div>
          </div>

          {/* Loading skeleton for comments */}
          <div className="border rounded-lg p-6">
            <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8"></div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-full bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

