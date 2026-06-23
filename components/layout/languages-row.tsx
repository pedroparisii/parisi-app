"use client";

import { useState } from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiReact,
  SiPostgresql,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface Lang {
  name: string;
  icon: IconType;
  color: string;
}

const langs: Lang[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "--primary" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  
];

export function LanguagesRow() {
  const [active, setActive] = useState(0);
  const activeLang = langs[active];

  return (
    <section className="flex flex-col gap-8">
      <div className="min-w-0">
        <p className="text-md text-muted-foreground">I build with</p>
        <p key={activeLang.name} className="mt-1 animate-in fade-in slide-in-from-bottom-1 text-4xl font-medium tracking-tight duration-300">
          {activeLang.name}
        </p>
      </div>

      {/* Right — the icon row */}
      <ul className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {langs.map((lang, i) => {
          const Icon = lang.icon;
          const isActive = i === active;
          return (
            <li key={lang.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={lang.name}
                className={cn(
                  "flex size-14 items-center justify-center rounded-lg border transition-all duration-300",
                  isActive
                    ? "border-border bg-card"
                    : "border-transparent",
                )}
              >
                <Icon
                  className="size-6 transition-all duration-300"
                  style={{
                    color: isActive ? lang.color : undefined,
                    opacity: isActive ? 1 : 0.4,
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}