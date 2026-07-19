"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DiscordAvatar } from "@/components/discord/discord-avatar";
import { ThemeToggle } from "@/components/layout/theme-toogle";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { useTheme } from "next-themes";

export default function Header() {
  const t = useTranslations("Header");
  const navItems = [
    { label: t("navWork"), href: "/work" },
    { label: t("navAbout"), href: "/about" },
  ];
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const iconSrc = !mounted
  ? "/icon.png"
  : resolvedTheme === "dark"
    ? "/icon.png"
    : "/iconblack.png";

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border select-none">
      <div className="flex items-center justify-between h-20 px-8 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link href="/" aria-label={t("logoAriaLabel")} onClick={() => setOpen(false)}>
          <span className="group font-mono font-medium text-2xl inline-flex items-center select-none">
            <span className="max-w-0 opacity-0 text-primary transition-all duration-300 group-hover:max-w-4 group-hover:opacity-100 group-hover:mr-1.5">{"{"}</span>

            {/* ícone: some no hover */}
            <Image src={iconSrc} alt="pedro.parisi" width={64} height={64} className="w-10 transition-all duration-300 group-hover:w-0 group-hover:opacity-0" />

            {/* nome: aparece no hover */}
            <div className="flex items-center overflow-hidden max-w-0 opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">
              <span className="text-muted-foreground whitespace-nowrap">pedro</span>
              <span className="text-primary font-semibold whitespace-nowrap">.parisi</span>
            </div>

            <span className="max-w-0 opacity-0 text-primary transition-all duration-300 group-hover:max-w-4 group-hover:opacity-100 group-hover:ml-1.5">{"}"}</span>
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <DiscordAvatar />
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          {/* HAMBURGER (mobile only) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="md:hidden relative flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-px w-5 bg-muted-foreground transition-all duration-300 ${
                open ? "translate-y-1.75 rotate-45 bg-primary" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-muted-foreground transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-muted-foreground transition-all duration-300 ${
                open ? "-translate-y-1.75 -rotate-45 bg-primary" : ""
              }`}
            />
          </button>
        </div> 
        
      </div>

      {/* DROPDOWN MOBILE */}
      <div
        className={`md:hidden overflow-hidden border-t border-border transition-all duration-300 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-8 py-4">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 py-3 font-mono text-base text-muted-foreground hover:text-foreground transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}