import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations, getLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import projectsData from "@/data/projects.json";
import { statusConfig, getProjectDescription, type Project } from "@/lib/projects";

const projects = projectsData as Project[];

export async function generateMetadata() {
  const t = await getTranslations("Work");
  return {
    title: `${t("title")} — Pedro Parisi`,
    description: t("description"),
  };
}

export default async function WorkPage() {
  const t = await getTranslations("Work");
  const locale = await getLocale();
  const featured = projects.filter((p) => p.featured);
  const shippedCount = projects.filter((p) => p.status === "shipped").length;

  return (
    <main className="max-w-7xl px-6 sm:px-8 md:mx-auto">

      <section className="pt-16 pb-12 ">
        <p className="mb-5 font-mono text-sm text-primary">
          <span className="text-muted-foreground">~/</span>works
        </p>
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {t("description")}
        </p>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {t("stats", { count: projects.length, shipped: shippedCount })}
        </p>
      </section>

      {/* Featured */}
      <section aria-label={t("featuredAria")} className="grid gap-4 md:grid-cols-2">
        {featured.map((project) => (
          <FeaturedCard key={project.slug} project={project} locale={locale} />
        ))}
      </section>

      {/* All the rest — compact list */}

        <section aria-label={t("moreAria")} className="mt-16">
          <p className="mb-2 font-mono text-xs text-muted-foreground">
            ~/more
          </p>
          <ul className="divide-y divide-border border-y border-border">
            {projects.map((project) => (
              <ProjectRow key={project.slug} project={project} locale={locale} />
            ))}
          </ul>
        </section>
    </main>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const { dot, pulse } = statusConfig[status];
  const t = useTranslations("ProjectStatus");
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className="relative flex size-1.5">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dot,
            )}
          />
        )}
        <span className={cn("relative inline-flex size-1.5 rounded-full", dot)} />
      </span>
      {t(status)}
    </span>
  );
}

function FeaturedCard({ project, locale }: { project: Project; locale: string }) {
  const href = project.hasPage ? `/work/${project.slug}` : project.repoUrl;
  if (!href) { return null; }
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
    >
      {/* Preview */}
      <div className="relative aspect-video border-b border-border bg-muted/30">
        {project.preview ? (
          <Image
            src={project.preview}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : project.icon ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            <Image
              src={project.icon}
              alt={`${project.title} icon`}
              width={96}
              height={96}
              className="shrink-0 rounded-md w-24"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{project.title}</h2>
          <StatusBadge status={project.status} />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {getProjectDescription(project, locale)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="font-mono text-[11px] font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProjectRow({ project, locale }: { project: Project; locale: string }) {
  const href = project.hasPage ? `/work/${project.slug}` : project.repoUrl;
  if (!href) { return null; }
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-4 py-5 transition-colors hover:bg-card/50 sm:gap-6 sm:px-4"
      >
        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {project.year}
        </span>

        {project.icon ? (
          <div className="shrink-0 w-10 h-10 rounded-md bg-foreground/20 flex items-center justify-center text-xs">
            <Image
              src={project.icon}
              alt={`${project.title} icon`}
              width={64}
              height={64}
              className="shrink-0 rounded-md w-8"
            />
          </div>
        ) : (
          <div className="shrink-0 w-10 h-10 rounded-md bg-foreground/20 flex items-center justify-center text-xs">
            <span>NaN</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-medium transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {getProjectDescription(project, locale)}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="shrink-0 self-center font-mono text-sm text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
        >
          <ArrowRight size={16} />
        </span>
      </Link>
    </li>
  );
}