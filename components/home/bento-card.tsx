import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  /** Monospace path-style label, e.g. "~/changelog" */
  label?: string;
  /** Small icon rendered next to the label (lucide icon, svg...) */
  icon?: React.ReactNode;
  interactive?: boolean;
  /** Adds the subtle blueprint grid background */
  grid?: boolean;
  /** Adds the accent glow on hover */
  glow?: boolean;
}

export function BentoCard({
  children,
  className,
  href,
  label,
  icon,
  interactive,
  grid,
  glow,
}: BentoCardProps) {
  const content = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors",
        href && "hover:border-foreground/20",
        grid && "card-grid-bg",
        glow && "card-glow",
        className,
      )}
    >
      {(label || icon || interactive) && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-muted-foreground [&_svg]:size-4">
                {icon}
              </span>
            )}
            {label && (
              <span className="font-mono text-xs text-muted-foreground">
                {label}
              </span>
            )}
          </div>
          {interactive && (
            <ArrowUpRight className="size-4 text-muted-foreground" />
          )}
        </div>
      )}
      {children}
    </div>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Two-tone description, Supabase-style.
 * Wrap key phrases in <Em> to make them pop:
 *
 * <CardText>
 *   Build things with <Em>real product mindset</Em>, not just pages.
 * </CardText>
 */
export function CardText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
  );
}

export function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}