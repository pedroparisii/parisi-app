"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { BentoCard } from "./bento-card";
import type { Track } from "@/lib/spotify";

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = (await res.json()) as Track | null;
        if (active) {
          setTrack(data);
          setLoaded(true);
        }
      } catch {
        if (active) setLoaded(true);
      }
    };

    fetchTrack();
    const id = setInterval(fetchTrack, 30_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const isPlaying = track?.isPlaying ?? false;
  const hasTrack = !!track;

  return (
    <BentoCard
      label="~/my-spotify"
      href={track?.songUrl}
      interactive={!!track?.songUrl}
      icon={<FaSpotify className="text-[#1DB954]" />}
      className="min-h-52"
    >
      {/* Ambient blurred album art — shown whenever we have a track at all */}
      {hasTrack && track?.albumImageUrl && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-8 -top-8 size-40 blur-2xl transition-opacity duration-700 ${
            isPlaying ? "opacity-20" : "opacity-10"
          }`}
        >
          <Image
            src={track.albumImageUrl}
            alt=""
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative flex flex-1 items-center gap-3.5">
        {/* album art / placeholder */}
        <div className="relative size-22 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {track?.albumImageUrl ? (
            <Image
              src={track.albumImageUrl}
              alt={`${track.title} album art`}
              fill
              sizes="88px"
              className={`object-cover transition-all duration-700 ${
                isPlaying ? "grayscale-0" : "grayscale-40"
              }`}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FaSpotify className="size-6 text-muted-foreground/40" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {!loaded ? (
            <div className="space-y-2">
              <div className="h-2.5 w-20 animate-pulse rounded bg-muted" />
              <div className="h-2.5 w-28 animate-pulse rounded bg-muted" />
            </div>
          ) : hasTrack && track ? (
            <>
              <div className="flex items-center gap-1.5">
                {isPlaying ? (
                  <>
                    <SoundBars />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      now listening
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    last played
                  </span>
                )}
              </div>
              <p className="mt-1.5 truncate text-sm font-medium">
                {track.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {track.artist}
              </p>
            </>
          ) : (
            <>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                offline
              </span>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Nothing to show right now
              </p>
            </>
          )}
        </div>
      </div>
    </BentoCard>
  );
}

/** Animated equalizer bars shown while a track is playing. */
function SoundBars() {
  return (
    <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-0.5 rounded-full bg-primary"
          style={{
            animation: `sound-bar 1s ease-in-out ${i * 0.15}s infinite`,
            height: "100%",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sound-bar {
          0%,
          100% {
            transform: scaleY(0.25);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </span>
  );
}