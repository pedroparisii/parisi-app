"use client";

import { useState } from "react";
import { saveProjects } from "@/lib/admin-actions";
import type { Project, ProjectStatus } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Plus, X, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUSES: ProjectStatus[] = ["building", "shipped", "archived"];

const statusDot: Record<ProjectStatus, string> = {
  shipped: "bg-emerald-400",
  building: "bg-amber-400",
  archived: "bg-muted-foreground/50",
};

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
    if (open === i) setOpen(null);
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">
          {projects.length} projects
        </p>
        <Button onClick={add} size="sm" variant="outline" className="gap-1.5">
          <Plus className="size-3.5" />
          add project
        </Button>
      </div>

      <ul className="space-y-2">
        {projects.map((project, i) => {
          const isOpen = open === i;
          return (
            <li
              key={i}
              className={cn(
                "overflow-hidden rounded-lg border bg-card transition-colors",
                isOpen ? "border-foreground/20" : "border-border",
              )}
            >
              {/* Row header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <ChevronRight
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-90",
                    )}
                  />
                  <span className={cn("size-1.5 shrink-0 rounded-full", statusDot[project.status])} />
                  <span className="font-medium">
                    {project.title || "untitled project"}
                  </span>
                  {project.featured && (
                    <Star className="size-3 fill-primary text-primary" />
                  )}
                </button>

                <Badge variant="secondary" className="font-mono text-[10px] font-normal">
                  {project.year}
                </Badge>

                <button
                  onClick={() => remove(i)}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="remove project"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Expanded fields */}
              {isOpen && (
                <div className="grid gap-4 border-t border-border bg-background/30 p-4 sm:grid-cols-2">
                  <FormField label="title" className="sm:col-span-2">
                    <Input
                      value={project.title}
                      onChange={(e) => update(i, { title: e.target.value })}
                      placeholder="Project name"
                    />
                  </FormField>

                  <FormField label="slug">
                    <Input
                      value={project.slug}
                      onChange={(e) => update(i, { slug: e.target.value })}
                      placeholder="my-project"
                      className="font-mono"
                    />
                  </FormField>

                  <FormField label="year">
                    <Input
                      type="number"
                      value={project.year}
                      onChange={(e) => update(i, { year: Number(e.target.value) })}
                    />
                  </FormField>

                  <FormField label="description" className="sm:col-span-2">
                    <Input
                      value={project.description}
                      onChange={(e) => update(i, { description: e.target.value })}
                      placeholder="One-line summary"
                    />
                  </FormField>

                  <FormField label="status">
                    <Select
                      value={project.status}
                      onValueChange={(v) => update(i, { status: v as ProjectStatus })}
                    >
                      <SelectTrigger>
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
                  </FormField>

                  <FormField label="stack (comma separated)">
                    <Input
                      value={project.stack.join(", ")}
                      onChange={(e) =>
                        update(i, {
                          stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Next.js, Supabase"
                    />
                  </FormField>

                  <FormField label="live url">
                    <Input
                      value={project.liveUrl ?? ""}
                      onChange={(e) => update(i, { liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="font-mono text-xs"
                    />
                  </FormField>

                  <FormField label="repo url">
                    <Input
                      value={project.repoUrl ?? ""}
                      onChange={(e) => update(i, { repoUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="font-mono text-xs"
                    />
                  </FormField>

                  <label className="flex cursor-pointer items-center gap-2 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={project.featured ?? false}
                      onChange={(e) => update(i, { featured: e.target.checked })}
                      className="size-4 rounded border-border accent-primary"
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      feature this project on the homepage
                    </span>
                  </label>
                </div>
              )}
            </li>
          );
        })}
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

function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="font-mono text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}