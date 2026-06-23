import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout } from "@/lib/auth-actions";
import { readDataFile } from "@/lib/github";
import { SkillsEditor } from "@/components/admin/skills-editor";
import { ProjectsEditor } from "@/components/admin/projects-editor";
import type { Project } from "@/lib/projects";
import type { Skill } from "@/lib/skills";

export const dynamic = "force-dynamic"; // always read fresh from GitHub

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isAuthed) redirect("/admin/login");

  // Read current data from the repo
  const [{ data: projects }, { data: skills }] = await Promise.all([
    readDataFile<Project[]>("data/projects.json"),
    readDataFile<Skill[]>("data/skills.json"),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> ./admin
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight">Admin</h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            logout
          </button>
        </form>
      </div>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        changes commit to GitHub · live in ~30s after rebuild
      </p>

      {/* Editors */}
      <div className="mt-10 space-y-6">
        <SkillsEditor initial={skills} />
        <ProjectsEditor initial={projects} />
      </div>
    </main>
  );
}
