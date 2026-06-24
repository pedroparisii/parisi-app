"use client";

import { useState } from "react";
import { saveSkills } from "@/lib/admin-actions";
import type { Skill, SkillStatus } from "@/lib/skills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUSES: SkillStatus[] = ["mastering", "learning", "next"];

const statusDot: Record<SkillStatus, string> = {
  mastering: "bg-foreground/70",
  learning: "bg-primary",
  next: "bg-muted-foreground/40",
};

export function SkillsEditor({ initial }: { initial: Skill[] }) {
  const [skills, setSkills] = useState<Skill[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(i: number, patch: Partial<Skill>) {
    setSkills((s) => s.map((skill, idx) => (idx === i ? { ...skill, ...patch } : skill)));
    setSaved(false);
  }

  function add() {
    setSkills((s) => [...s, { name: "", status: "learning" }]);
    setSaved(false);
  }

  function remove(i: number) {
    setSkills((s) => s.filter((_, idx) => idx !== i));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      await saveSkills(skills.filter((s) => s.name.trim()));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">
          {skills.length} skills
        </p>
        <Button onClick={add} size="sm" variant="outline" className="gap-1.5">
          <Plus className="size-3.5" />
          add skill
        </Button>
      </div>

      <ul className="space-y-2">
        {skills.map((skill, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
          >
            <span className={cn("size-1.5 shrink-0 rounded-full", statusDot[skill.status])} />

            <Input
              value={skill.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="skill name"
              className="h-9 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
            />

            <Select
              value={skill.status}
              onValueChange={(v) => update(i, { status: v as SkillStatus })}
            >
              <SelectTrigger className="h-8 w-32 font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="font-mono text-xs">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              onClick={() => remove(i)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="remove skill"
            >
              <X className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 pt-1">
        <Button onClick={save} disabled={saving} size="sm" className="gap-1.5">
          {saving ? "committing…" : "save changes"}
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400">
            <Check className="size-3.5" />
            committed to github
          </span>
        )}
      </div>
    </div>
  );
}