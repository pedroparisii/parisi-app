import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { statusConfig, type Project } from "@/lib/projects";
import { ProjectMeta } from "@/components/work/project-meta";
import { ReadingProgress } from "@/components/work/reading-progress";
import { ArrowLeft } from "lucide-react";

const projects = projectsData as Project[];

export function generateStaticParams() {
  return projects.filter((p) => p.hasPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Pedro Parisi`,
    description: project.description,
  };
}

export default async function ProjectPage({ params, }: { params: Promise<{ slug: string }>; }) {
  
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.hasPage) notFound();

  let Content: React.ComponentType;
  try {
    const mod = await import(`@/content/work/${slug}.mdx`);
    Content = mod.default;
  } catch {
    notFound();
  }

  const status = statusConfig[project.status];

  return (
    <>
      <ReadingProgress />

      <main className="mx-auto max-w-5xl px-6 sm:px-8 pb-24">
        {/* Back link */}
        <Link
          href="/work"
          className="group mt-12 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            <ArrowLeft size={12} />
          </span>
          back
        </Link>

        {/* Header — full width */}
        <header className="mt-8">
          <p className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">~/work/</span>{project.slug}.md
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <span className={`size-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {project.description}
          </p>
        </header>

        {/* Hero image — full width */}
        {project.preview && (
          <div className="relative mt-10 aspect-2/1 overflow-hidden rounded-xl border border-border bg-muted/30">
            <Image
              src={project.preview}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Two-column: content + sticky spec sheet */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0 max-w-2xl">
            <Content />
          </article>
          <ProjectMeta project={project} />
        </div>
      </main>
    </>
  );
}
