"use client";

import { useEffect, useState } from "react";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

interface LanyardData {
  discord_status: DiscordStatus;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

const USER_ID = "1122397958177030185"; // ← put your Discord user ID here

/**
 * Subscribes to your Discord presence via Lanyard's WebSocket.
 * Updates in real time when you go online/offline/idle.
 * No auth, no token — Lanyard is public.
 *
 * Setup: join discord.gg/lanyard once so Lanyard can see your presence,
 * then paste your Discord user ID above.
 */
export function useDiscordStatus() {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnect: ReturnType<typeof setTimeout> | null = null;

    const connect = () => {
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        // op 1 = hello → start heartbeat and subscribe
        if (message.op === 1) {
          const interval = message.d.heartbeat_interval;
          heartbeat = setInterval(() => {
            socket?.send(JSON.stringify({ op: 3 }));
          }, interval);

          socket?.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: USER_ID },
            }),
          );
        }

        // op 0 = presence data (INIT_STATE + PRESENCE_UPDATE)
        if (message.op === 0) {
          const d = message.d;
          setData({
            discord_status: d.discord_status,
            active_on_discord_mobile: d.active_on_discord_mobile,
            active_on_discord_desktop: d.active_on_discord_desktop,
          });
        }
      };

      socket.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        // try to reconnect after 5s
        reconnect = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (heartbeat) clearInterval(heartbeat);
      if (reconnect) clearTimeout(reconnect);
      socket?.close();
    };
  }, []);

  return data;
}