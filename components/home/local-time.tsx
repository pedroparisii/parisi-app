"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BentoCard, CardText, Em } from "./bento-card";
import { Clock } from "lucide-react";

const TIME_ZONE = "America/Sao_Paulo";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function LocalTime() {
  const t = useTranslations("LocalTime");
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCard
      label={t("label")}
      grid
      icon={<Clock />}
      className="min-h-52"
    >
      <CardText>
        {t.rich("text", { em: (chunks) => <Em>{chunks}</Em> })}
      </CardText>

      <p
        className="z-10 mt-4 font-mono text-3xl font-medium tabular-nums tracking-tight"
        suppressHydrationWarning
      >
        {time ?? "--:--:--"}
      </p>

      {/* decorative horizon arcs bleeding off the bottom edge */}
      <svg
        className="pointer-events-none absolute top-20 -bottom-16 left-1/2 h-40 w-[120%] -translate-x-1/2 text-border"
        viewBox="0 0 400 160"
        fill="none"
        aria-hidden="true"
      >
        <ellipse cx="200" cy="160" rx="190" ry="70" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="200" cy="160" rx="140" ry="50" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="200" cy="160" rx="90" ry="32" stroke="currentColor" strokeWidth="1" />
        {/* tiny "sun" on the horizon using the accent */}
        <circle cx="285" cy="98" r="4" className="fill-primary" />
      </svg>
    </BentoCard>
  );
}