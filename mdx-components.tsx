import type { MDXComponents } from "mdx/types";
import { Callout, Stats, Figure } from "@/components/work/case-study-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    Stats,
    Figure,

    h2: (props) => (
      <h2
        className="group mt-14 mb-3 scroll-mt-28 text-xl font-medium tracking-tight"
        {...props}
      />
    ),
    h3: (props) => <h3 className="mt-8 mb-2 text-lg font-medium" {...props} />,
    p: (props) => (
      <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
    ),
    ul: (props) => (
      <ul
        className="mb-4 ml-5 list-disc space-y-1.5 text-muted-foreground marker:text-primary/60"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mb-4 ml-5 list-decimal space-y-1.5 text-muted-foreground marker:text-primary/60"
        {...props}
      />
    ),
    li: (props) => <li className="leading-relaxed pl-1" {...props} />,
    a: (props) => (
      <a
        className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm"
        {...props}
      />
    ),
    strong: (props) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-primary pl-4 italic text-muted-foreground"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
    ...components,
  };
}
