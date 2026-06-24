import { BentoCard } from "./bento-card";
import { cn } from "@/lib/utils";
import { PixelGrid } from "@/components/home/pixel-card";

type ChangeType = "new" | "improvement" | "fix";

interface ChangelogEntry {
  type: ChangeType;
  text: string;
}

const entries: ChangelogEntry[] = [
  { type: "new", text: "Added dedicated project pages" },
  { type: "improvement", text: "Refined the header interactions" },
  { type: "fix", text: "Adjusted contrast in dark mode" },
];

const typeStyles: Record<ChangeType, string> = {
  new: "bg-primary text-primary-foreground border-transparent",
  improvement: "text-primary border-primary/30",
  fix: "text-muted-foreground border-border",
};

const typeLabel: Record<ChangeType, string> = {
  new: "new",
  improvement: "imp",
  fix: "fix",
};

export function ChangelogPreview() {
  return (
    <BentoCard label="~/changelog">
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
