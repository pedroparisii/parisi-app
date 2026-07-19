import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusConfig, type Project } from "@/lib/projects";
import { FaGithub } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";

export function ProjectMeta({ project }: { project: Project }) {
  const t = useTranslations("ProjectMeta");
  const statusT = useTranslations("ProjectStatus");
  const status = statusConfig[project.status];

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: t("status"),
      value: (
        <span className="inline-flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${status.dot}`} />
          {statusT(project.status)}
        </span>
      ),
    },
    { label: t("year"), value: project.year },
    { label: t("role"), value: t("roleValue") },
  ];

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="font-mono text-xs text-muted-foreground">~/spec</p>

        <dl className="mt-4 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <dt className="font-mono text-xs text-muted-foreground">
                {row.label}
              </dt>
              <dd className="font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        {/* Stack */}
        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-2 font-mono text-xs text-muted-foreground">{t("stack")}</p>
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
        </div>

        {/* Links */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
            {project.liveUrl && (
              <Button asChild size="sm" className="w-full">
                <a href={project.liveUrl} target="_blank">
                  {t("liveDemo")} <HiOutlineStatusOnline className="ml-1" />
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild size="sm" variant="outline" className="w-full">
                <a href={project.repoUrl} target="_blank" >
                  {t("sourceCode")} <FaGithub className="ml-1" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
