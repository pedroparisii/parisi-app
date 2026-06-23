export type SkillStatus = "mastering" | "learning" | "next";

export interface Skill {
  name: string;
  status: SkillStatus;
}

export const skillStatusConfig: Record<
  SkillStatus,
  { label: string; style: string; dot: string }
> = {
  mastering: {
    label: "mastering",
    style: "border-border text-foreground",
    dot: "bg-foreground/70",
  },
  learning: {
    label: "learning",
    style: "border-primary/40 text-primary",
    dot: "bg-primary animate-pulse",
  },
  next: {
    label: "next",
    style: "border-border border-dashed text-muted-foreground",
    dot: "bg-muted-foreground/40",
  },
};