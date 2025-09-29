export default function TutorialsPage() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Tutorials
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          Hands-on guides to help you master frameworks, tooling, and modern UI patterns.
        </p>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {["Next.js Fundamentals", "TypeScript Essentials", "UI Patterns with Tailwind"].map((title) => (
          <div key={title} className="rounded-xl border p-6 bg-card text-card-foreground">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Quick, practical lessons with copy-paste snippets and clear explanations.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">~ 10–15 min</div>
          </div>
        ))}
      </section>

      <section className="mt-16 mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold">Want more?</h2>
        <p className="mt-3 text-muted-foreground">
          We add new tutorials regularly—bookmark this page and check back soon.
        </p>
      </section>
    </main>
  );
}
