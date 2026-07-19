import { useTranslations } from "next-intl";
import { BentoCard, CardText, Em } from "./bento-card";
import { cn } from "@/lib/utils";

type SkillStatus = "learning" | "next" | "mastering";

import skillsData from "@/data/skills.json";
import { skillStatusConfig, type Skill } from "@/lib/skills";

const skills = skillsData as Skill[];

const statusStyle: Record<SkillStatus, string> = {
  learning: "border-primary/40 text-primary",
  mastering: "border-border text-foreground",
  next: "border-border border-dashed text-muted-foreground",
};

const statusDot: Record<SkillStatus, string> = {
  learning: "bg-primary animate-pulse",
  mastering: "bg-foreground/70",
  next: "bg-muted-foreground/40",
};

export function CurrentlyLearning() {
  const t = useTranslations("CurrentlyLearning");
  return (
    <BentoCard
      label={t("label")}
      glow
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
        </svg>
      }
      className="min-h-52"
    >
      <CardText>
        {t.rich("text", { em: (chunks) => <Em>{chunks}</Em> })}
      </CardText>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none",
              statusStyle[skill.status],
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", statusDot[skill.status])}
            />
            {skill.name}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}