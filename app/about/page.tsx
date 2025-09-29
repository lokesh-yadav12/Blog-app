export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About ByteCode
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          We publish practical guides, deep dives, and opinion pieces on modern web development.
          Our mission is to help developers sharpen their skills and build delightful products.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 bg-card text-card-foreground">
          <h3 className="text-xl font-semibold">Quality First</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Every article is peer-reviewed for accuracy, clarity, and practical value.
          </p>
        </div>
        <div className="rounded-xl border p-6 bg-card text-card-foreground">
          <h3 className="text-xl font-semibold">Community Driven</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We collaborate with engineers, designers, and educators across the globe.
          </p>
        </div>
        <div className="rounded-xl border p-6 bg-card text-card-foreground">
          <h3 className="text-xl font-semibold">Always Learning</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The ecosystem evolves quickly—so do we. Expect frequent updates and fresh insights.
          </p>
        </div>
      </section>

      <section className="mt-16 mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold">Join Our Journey</h2>
        <p className="mt-3 text-muted-foreground">
          Subscribe for updates and follow along as we explore frameworks, tooling, and best practices.
        </p>
      </section>
    </main>
  );
}
