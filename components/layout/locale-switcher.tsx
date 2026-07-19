"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { setLocale } from "@/lib/locale-actions";
import type { Locale } from "@/i18n/request";
import { cn } from "@/lib/utils";

const options: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5 font-mono text-xs">
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => switchTo(option.code)}
          disabled={isPending}
          aria-pressed={locale === option.code}
          className={cn(
            "rounded-md px-2 py-1 transition-colors disabled:opacity-50",
            locale === option.code
              ? "bg-card text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
