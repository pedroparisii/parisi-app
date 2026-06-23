import Link from "next/link";
import projectsData from "@/data/projects.json";
import { type Project } from "@/lib/projects";

const projects = projectsData as Project[];

/** Links to the previous and next case-study projects. */
export function ProjectNav({ current }: { current: Project }) {
  // Only navigate between projects that actually have pages.
  const pages = projects.filter((p) => p.hasPage);
  const index = pages.findIndex((p) => p.slug === current.slug);

  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-8">
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/20"
        >
          <span className="font-mono text-xs text-muted-foreground">
            ← previous
          </span>
          <span className="font-medium transition-colors group-hover:text-primary">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-foreground/20"
        >
          <span className="font-mono text-xs text-muted-foreground">
            next →
          </span>
          <span className="font-medium transition-colors group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
