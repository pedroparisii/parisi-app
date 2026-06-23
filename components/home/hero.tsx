import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col items-start pt-12 sm:pt-20">
      {/* terminal prompt eyebrow */}

      <h1 className="max-w-3xl text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl">
        Pedro Parisi — fullstack developer{" "}
        <span className="text-muted-foreground">building things that ship.</span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
        Not just a portfolio. A personal platform treated as a real product
        with a changelog, living projects, and evolution out in the open.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/work">
            view works
              <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about">about me</Link>
        </Button>
      </div>

    </section>
  );
}
