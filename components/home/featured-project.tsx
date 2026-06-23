import { BentoCard } from "./bento-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// TODO: replace with data fetched from Supabase (your most recent / pinned project)
const featured = {
  slug: "example-project",
  title: "Featured project",
  description:
    "A larger card with a visual preview, the stack, and a link to the dedicated project page.",
  stack: ["Next.js", "Supabase", "TypeScript"],
};

export function FeaturedProject() {
  return (
    <BentoCard
      href={`/work/${featured.slug}`}
      label="~/featured-project"
      interactive
      className="min-h-65"
    >

      <Image
        className="my-3 w-40"
        src="/smart-shelf.png"
        alt="Project"
        width={150}
        height={50}
      />
      
      <div>
        <h2 className="text-lg font-medium">{featured.title}</h2>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
          {featured.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {featured.stack.map((tech, i) => (
            <Badge
              key={tech}
              variant={i === 0 ? "default" : "secondary"}
              className="font-mono text-xs font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
