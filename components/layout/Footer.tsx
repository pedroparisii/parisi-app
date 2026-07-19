import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiGithub, SiX } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

const navItems = [
  { label: "work", href: "/work" },
  { label: "writing", href: "/writing" },
  { label: "about", href: "/about" },
];

const socials = [
  { icon: SiGithub, href: "https://github.com/pedroparisii", label: "GitHub" },
  { icon: SiX, href: "https://x.com/pedrovrparisi", label: "X" },
  { icon: BsLinkedin, href: "https://linkedin.com/in/pedroparisi", label: "LinkedIn" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <div className="flex flex-col gap-2">
          <Link href="/admin" aria-label="pedro.parisi — home">
            <span className="group font-mono font-medium text-lg inline-flex items-center select-none">
              <span className="text-primary">{"{"}</span>
              <span className="text-muted-foreground ml-1.5">pedro</span>
              <span className="text-primary font-semibold mr-1">.parisi</span>
              <span className="text-primary">{"}"}</span>
            </span>
          </Link>
          <p className="font-mono text-xs text-muted-foreground">
            {t("builtFromScratch")}
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto p-8 md:py-5 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Pedro Parisi</span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#10b95c] opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10b95c]" />
            </span>
            {t("allSystemsOperational")}
          </span>
        </div>
      </div>
    </footer>
  );
}