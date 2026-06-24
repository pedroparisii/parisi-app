"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDiscordStatus } from "@/components/discord/use-discord";
import { profile, socials } from "./about-data";

const statusColor = {
  online: "bg-[#23a55a]",
  idle: "bg-[#f0b232]",
  dnd: "bg-[#f23f43]",
  offline: "bg-[#80848e]",
} as const;

export function ProfileHeader() {
  const data = useDiscordStatus();
  const color = statusColor[data?.discord_status ?? "offline"];

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Avatar className="size-24 border border-border">
            <AvatarImage src="/me.png" alt={profile.name} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <span
            className={`absolute bottom-1 right-1 size-5 rounded-full border-2 border-background ${color}`}
          />
        </div>

        <div>
          <h1 className="text-2xl font-medium tracking-tight">
            {profile.name}
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <Tooltip key={social.label}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-9"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-xs">
                {social.handle}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}