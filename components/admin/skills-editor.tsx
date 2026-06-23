"use client";

import { useState } from "react";
import { saveSkills } from "@/lib/admin-actions";
import type { Skill, SkillStatus } from "@/lib/skills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUSES: SkillStatus[] = ["mastering", "learning", "next"];

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
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">~/skills</p>
        <Button onClick={add} size="sm" variant="outline">
          + add
        </Button>
      </div>

      <ul className="space-y-2">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-center gap-2">
            <Input
              value={skill.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="skill name"
              className="flex-1"
            />
            <select
              value={skill.status}
              onChange={(e) => update(i, { status: e.target.value as SkillStatus })}
              className="h-9 rounded-md border border-border bg-background px-2 font-mono text-xs"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={() => remove(i)}
              className="px-2 font-mono text-xs text-muted-foreground hover:text-destructive"
              aria-label="remove"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={save} disabled={saving} size="sm">
          {saving ? "committing…" : "save"}
        </Button>
        {saved && (
          <span className="font-mono text-xs text-emerald-400">
            ✓ committed
          </span>
        )}
      </div>
    </section>
  );
}
