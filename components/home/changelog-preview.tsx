import { useTranslations } from "next-intl";
import { BentoCard } from "./bento-card";
import { cn } from "@/lib/utils";
import { PixelGrid } from "@/components/home/pixel-card";

type ChangeType = "new" | "improvement" | "fix";

interface ChangelogEntry {
  type: ChangeType;
  text: string;
}

const typeStyles: Record<ChangeType, string> = {
  new: "bg-primary text-primary-foreground border-transparent",
  improvement: "text-primary border-primary/30",
  fix: "text-muted-foreground border-border",
};

export function ChangelogPreview() {
  const t = useTranslations("Changelog");
  const entries = t.raw("entries") as ChangelogEntry[];
  const typeLabel: Record<ChangeType, string> = {
    new: t("typeNew"),
    improvement: t("typeImprovement"),
    fix: t("typeFix"),
  };

  return (
    <BentoCard label={t("label")}>
      <ul className="flex flex-col gap-3">
        {entries.map((entry, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none",
                typeStyles[entry.type],
              )}
            >
              {typeLabel[entry.type]}
            </span>
            <span className="text-sm leading-snug text-muted-foreground">
              {entry.text}
            </span>
          </li>
        ))}
        <PixelGrid />
      </ul>
    </BentoCard>
  );
}
