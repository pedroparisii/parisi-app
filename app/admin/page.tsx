import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout } from "@/lib/auth-actions";
import { readDataFile } from "@/lib/github";
import { BootSequence } from "@/components/admin/boot-sequence";
import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";
import type { Skill } from "@/lib/skills";
import { FolderGit2, GraduationCap, Rocket, Hammer } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isAuthed) redirect("/admin/login");

  let projects: Project[] = [];
  let skills: Skill[] = [];
  let loadError: string | null = null;

  try {
    const [p, s] = await Promise.all([
      readDataFile<Project[]>("data/projects.json"),
      readDataFile<Skill[]>("data/skills.json"),
    ]);
    projects = p.data;
    skills = s.data;
  } catch {
    loadError = "connection to github failed, verify access token";
  }

  const shipped = projects.filter((p) => p.status === "shipped").length;
  const building = projects.filter((p) => p.status === "building").length;
  const learning = skills.filter((s) => s.status === "learning").length;

  return (
    <div className="min-h-screen">
      {/* Command bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2.5 font-mono text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-muted-foreground">parisi.os</span>
            <Badge variant="secondary" className="h-5 font-mono text-[10px] font-normal">
              online
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              view site ↗
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
              >
                disconnect
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">

          <h1 className="text-3xl py-4 font-medium tracking-tight sm:text-5xl">
            Dashboard
          </h1>
        

        {loadError ? (
          <Card className="mt-6 border-destructive/30 bg-destructive/5 p-5">
            <p className="font-mono text-xs text-destructive">
              {"// "}
              {loadError}
            </p>
          </Card>
        ) : (
          <>
            {/* Stat cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard icon={<FolderGit2 className="size-4" />} value={projects.length} label="projects" />
              <StatCard icon={<Rocket className="size-4" />} value={shipped} label="shipped" accent />
              <StatCard icon={<Hammer className="size-4" />} value={building} label="building" />
              <StatCard icon={<GraduationCap className="size-4" />} value={learning} label="learning" />
            </div>

            {/* Workspace */}
            <div className="mt-8">
              <AdminWorkspace projects={projects} skills={skills} />
            </div>
          </>
        )}

        {/* JARVIS boot greeting */}
        <Card className="border-border bg-card/50 p-5 mt-10">
          <BootSequence userName="Pedro" />
        </Card>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <Card className="group relative overflow-hidden p-5 transition-colors border border-transparent hover:border-foreground/20">
      {accent && (
        <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/10 blur-2xl" />
      )}
      <div className="flex items-center justify-between">
        <span className={accent ? "text-primary" : "text-muted-foreground"}>{icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-4 text-3xl font-medium tabular-nums tracking-tight">{value}</p>
    </Card>
  );
}