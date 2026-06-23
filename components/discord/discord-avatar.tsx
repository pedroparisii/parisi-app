"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDiscordStatus } from "./use-discord";

const status = {
  online: { color: "bg-[#23a55a]", label: "Online" },
  idle: { color: "bg-[#f0b232]", label: "Idle" },
  dnd: { color: "bg-[#f23f43]", label: "Do not disturb" },
  offline: { color: "bg-[#80848e]", label: "Offline" },
} as const;

export function DiscordAvatar() {
  const data = useDiscordStatus();
  const { color, label } = status[data?.discord_status ?? "offline"];

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