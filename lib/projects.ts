export type ProjectStatus = "shipped" | "building" | "archived";

export interface Project {
  slug: string;
  title: string;
  description: string;
  year: number;
  stack: string[];
  status: ProjectStatus;
  featured?: boolean;
  image?: string;
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