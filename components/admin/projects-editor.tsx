"use client";

import { useState } from "react";
import { saveProjects } from "@/lib/admin-actions";
import type { Project, ProjectStatus } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUSES: ProjectStatus[] = ["building", "shipped", "archived"];

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    description: "",
    year: new Date().getFullYear(),
    stack: [],
    status: "building",
  };
}

export function ProjectsEditor({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  function update(i: number, patch: Partial<Project>) {
    setProjects((p) => p.map((proj, idx) => (idx === i ? { ...proj, ...patch } : proj)));
    setSaved(false);
  }

  function add() {
    setProjects((p) => [emptyProject(), ...p]);
    setOpen(0);
    setSaved(false);
  }

  function remove(i: number) {
    setProjects((p) => p.filter((_, idx) => idx !== i));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      await saveProjects(projects.filter((p) => p.slug.trim() && p.title.trim()));
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">~/projects</p>
        <Button onClick={add} size="sm" variant="outline">
          + add
        </Button>
      </div>

      <ul className="space-y-2">
        {projects.map((project, i) => (
          <li key={i} className="rounded-lg border border-border">
            {/* Row header */}
            <div className="flex items-center gap-2 p-3">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex flex-1 items-center gap-2 text-left"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {open === i ? "▾" : "▸"}
                </span>
                <span className="font-medium">
                  {project.title || "(untitled)"}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {project.status}
                </span>
              </button>
              <button
                onClick={() => remove(i)}
                className="px-2 font-mono text-xs text-muted-foreground hover:text-destructive"
                aria-label="remove"
              >
                ✕
              </button>
            </div>

            {/* Expanded fields */}
            {open === i && (
              <div className="space-y-2 border-t border-border p-3">
                <Field label="title">
                  <Input
                    value={project.title}
                    onChange={(e) => update(i, { title: e.target.value })}
                  />
                </Field>
                <Field label="slug">
                  <Input
                    value={project.slug}
                    onChange={(e) => update(i, { slug: e.target.value })}
                    placeholder="my-project"
                  />
                </Field>
                <Field label="description">
                  <Input
                    value={project.description}
                    onChange={(e) => update(i, { description: e.target.value })}
                  />
                </Field>
                <div className="flex gap-2">
                  <Field label="year">
                    <Input
                      type="number"
                      value={project.year}
                      onChange={(e) => update(i, { year: Number(e.target.value) })}
                    />
                  </Field>
                  <Field label="status">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        update(i, { status: e.target.value as ProjectStatus })
                      }
                      className="h-9 w-full rounded-md border border-border bg-background px-2 font-mono text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="stack (comma separated)">
                  <Input
                    value={project.stack.join(", ")}
                    onChange={(e) =>
                      update(i, {
                        stack: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </Field>
                <div className="flex gap-2">
                  <Field label="live url">
                    <Input
                      value={project.liveUrl ?? ""}
                      onChange={(e) => update(i, { liveUrl: e.target.value })}
                    />
                  </Field>
                  <Field label="repo url">
                    <Input
                      value={project.repoUrl ?? ""}
                      onChange={(e) => update(i, { repoUrl: e.target.value })}
                    />
                  </Field>
                </div>
                <label className="flex items-center gap-2 pt-1 font-mono text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={project.featured ?? false}
                    onChange={(e) => update(i, { featured: e.target.checked })}
                  />
                  featured
                </label>
              </div>
            )}
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block flex-1">
      <span className="mb-1 block font-mono text-xs text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
