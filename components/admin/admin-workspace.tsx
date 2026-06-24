"use client";

import { useState } from "react";
import { SkillsEditor } from "@/components/admin/skills-editor";
import { ProjectsEditor } from "@/components/admin/projects-editor";
import type { Project } from "@/lib/projects";
import type { Skill } from "@/lib/skills";
import { cn } from "@/lib/utils";

type Tab = "projects" | "skills";

export function AdminWorkspace({
  projects,
  skills,
}: {
  projects: Project[];
  skills: Skill[];
}) {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <div>
      {/* Tab switcher — plain buttons, no shadcn Tabs */}
      <div className="inline-flex gap-1 rounded-lg border border-border bg-card p-1">
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          ~/projects
        </TabButton>
        <TabButton active={tab === "skills"} onClick={() => setTab("skills")}>
          ~/skills
        </TabButton>
      </div>

      {/* Panel */}
      <div className="mt-4">
        {tab === "projects" ? (
          <ProjectsEditor initial={projects} />
        ) : (
          <SkillsEditor initial={skills} />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-1.5 font-mono text-xs transition-colors",
        active
          ? "bg-background text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}