import Image from "next/image";

/**
 * Custom components usable inside any case-study .mdx file.
 * Import-free in MDX once registered in mdx-components.tsx (see note below),
 * or import directly at the top of an .mdx file.
 */

/** Highlighted aside — for a key insight, warning, or note. */
export function Callout({
  children,
  label = "note",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <aside className="my-6 rounded-lg border border-border bg-card p-5">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-muted-foreground [&>p]:mb-0">
        {children}
      </div>
    </aside>
  );
}

/** A row of big metric callouts, e.g. impact numbers. */
export function Stats({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-border bg-card p-4"
        >
          <p className="text-2xl font-medium tracking-tight">{item.value}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Image with an optional caption, styled to match the site. */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 750,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
