"use client";
import { BentoCard } from "./bento-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import projectsData from "@/data/projects.json";
import { type Project } from "@/lib/projects";

import { useState } from "react";

const featuredProjects = (projectsData as Project[]).filter((p) => p.featured);

export function FeaturedProject() {
  const [featured] = useState( () => featuredProjects[Math.floor(Math.random() * featuredProjects.length)] );
  return (
    <BentoCard
      href={featured.hasPage ? `/work/${featured.slug}` : (featured.repoUrl ?? "#")}
      label="~/featured-project"
      interactive
      className="min-h-65"
    >
      {featured.image && (
        <Image
          className="my-3 w-40"
          src={featured.image}
          alt={featured.title}
          width={200}
          height={200}
        />
      )}

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
