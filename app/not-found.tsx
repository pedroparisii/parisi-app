import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-primary">
        <span className="text-muted-foreground">$</span> cd {"<page>"}
      </p>

      <h1 className="mt-6 font-mono text-6xl font-medium tracking-tight">
        404
      </h1>

      <p className="mt-4 font-mono text-sm text-muted-foreground">
        no such file or directory
      </p>

      <Button asChild variant="outline" className="mt-8 font-mono">
        <Link href="/">
          back to home
          <span aria-hidden="true" className="ml-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </Button>
    </main>
  );
}