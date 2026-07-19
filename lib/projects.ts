export type ProjectStatus = "shipped" | "building" | "archived";

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** pt-BR translation of `description`. Falls back to `description` when missing. */
  descriptionPt?: string;
  year: number;
  stack: string[];
  status: ProjectStatus;
  featured?: boolean;
  image?: string;
  preview?: string;
  icon?: string;
  liveUrl?: string;
  repoUrl?: string;
  hasPage?: boolean;
}

export const statusConfig: Record<ProjectStatus, { label: string; dot: string; pulse?: boolean }> = {
  shipped: { label: "shipped", dot: "bg-emerald-400" },
  building: { label: "building", dot: "bg-amber-400", pulse: true },
  archived: { label: "archived", dot: "bg-muted-foreground/50" },
};

/** Returns the project description in the given locale, falling back to English. */
export function getProjectDescription(project: Project, locale: string): string {
  if (locale === "pt" && project.descriptionPt) return project.descriptionPt;
  return project.description;
}