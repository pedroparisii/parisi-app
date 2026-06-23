"use client";

import { useEffect, useState } from "react";

/** A thin reading-progress bar fixed under the header. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
