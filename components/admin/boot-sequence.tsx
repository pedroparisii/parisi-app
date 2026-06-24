"use client";

import { useState, useEffect } from "react";

const BOOT_LINES = [
  "initializing parisi.os...",
  "loading modules: projects, skills, content",
  "establishing secure link to github...",
  "authentication verified ✓",
  "all systems operational.",
];

export function BootSequence({ userName = "Pedro" }: { userName?: string }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), 300 + Math.random() * 500);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), 1500);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  if (done) {
    return (
      <div className="font-mono text-sm text-muted-foreground">
        <span>{">"} </span>
        <span>Welcome back, </span>
        <span className="text-primary">{userName}</span>
        <span>. All systems operational.</span>
        <span className="cursor-blink ml-1 text-primary">_</span>
      </div>
    );
  }

  return (
    <div className="space-y-1 font-mono text-xs h-24">
      {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
        <div
          key={i}
          className="animate-in fade-in slide-in-from-left-2 duration-300"
        >
          <span className="text-muted-foreground/50">{">"} </span>
          <span className={line.includes("✓") ? "text-emerald-400" : "text-muted-foreground"}>
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}