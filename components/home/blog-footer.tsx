import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function BlogFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Grid container - responsive layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Branding Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Byte
              </span>
              <span className="text-foreground">Code</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">
              Where ideas meet innovation. Dive into a world of insightful
              articles written by passionate thinkers and industry experts.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              <Link
                href="https://twitter.com/yourusername"
                target="_blank"
                aria-label="Twitter"
              >
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5 text-muted-foreground" />
                </Button>
              </Link>

              <Link
                href="https://github.com/lokesh-yadav12"
                target="_blank"
                aria-label="Github"
              >
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5 text-muted-foreground" />
                </Button>
              </Link>

              <Link
                href="https://www.linkedin.com/in/lokesh-kumar-0a7522271/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5 text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Topics
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Podcasts
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              Stay Updated
            </h3>
            <form className="mt-4 flex flex-col gap-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-6 w-full"
                />
                <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <Button type="submit" className="w-full sm:w-auto sm:self-start">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ByteCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
