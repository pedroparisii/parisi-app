"use client";

import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDiscordStatus } from "./use-discord";

const statusColor = {
  online: "bg-[#23a55a]",
  idle: "bg-[#f0b232]",
  dnd: "bg-[#f23f43]",
  offline: "bg-[#80848e]",
} as const;

export function DiscordAvatar() {
  const t = useTranslations("Discord");
  const data = useDiscordStatus();
  const key = data?.discord_status ?? "offline";
  const color = statusColor[key];
  const label = t(key);

  return (
    <div className="group flex items-center">
      <div className="relative pl-4 border-l border-border cursor-pointer">
        <Avatar className="size-9">
          <AvatarImage src="/me.png" alt="Pedro Parisi" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        <span
          className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background ${color}`}
        />
      </div>
      <p className="overflow-hidden whitespace-nowrap text-sm font-light text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:ml-4 group-hover:opacity-100">
        {label}
      </p>
    </div>
  );
}