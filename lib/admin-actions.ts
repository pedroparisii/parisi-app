"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { writeDataFile } from "@/lib/github";
import type { Project } from "@/lib/projects";
import type { Skill } from "@/lib/skills";

/** Guard — every admin action checks auth first. */
async function requireAuth() {
  const session = await getSession();
  if (!session.isAuthed) throw new Error("Unauthorized");
}

export async function saveProjects(projects: Project[]) {
  await requireAuth();
  await writeDataFile(
    "data/projects.json",
    projects,
    "chore(admin): update projects",
  );
  // refresh the pages that read this data
  revalidatePath("/work");
  revalidatePath("/");
  return { ok: true };
}

export async function saveSkills(skills: Skill[]) {
  await requireAuth();
  await writeDataFile(
    "data/skills.json",
    skills,
    "chore(admin): update skills",
  );
  revalidatePath("/");
  revalidatePath("/about");
  return { ok: true };
}
