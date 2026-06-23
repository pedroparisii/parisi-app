import "server-only";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

export interface Track {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string | null;
  songUrl: string;
  playedAt?: string;
}

export type NowPlaying = Track;

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to refresh Spotify access token");

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function mapTrack(
  item: {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
  },
  isPlaying: boolean,
  playedAt?: string,
): Track {
  return {
    isPlaying,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    albumImageUrl: item.album.images?.[0]?.url ?? null,
    songUrl: item.external_urls.spotify,
    playedAt,
  };
}

/** Currently playing track */
async function fetchNowPlaying(accessToken: string): Promise<Track | null> {
  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status > 400) return null;

  const song = await res.json();
  if (!song || !song.item) return null;

  return mapTrack(song.item, song.is_playing);
}

/** Most recently played track. */
async function fetchLastPlayed(accessToken: string): Promise<Track | null> {
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  const item = data?.items?.[0];
  if (!item?.track) return null;

  return mapTrack(item.track, false, item.played_at);
}

export async function getSpotifyTrack(): Promise<Track | null> {
  const accessToken = await getAccessToken();

  const nowPlaying = await fetchNowPlaying(accessToken);
  if (nowPlaying) return nowPlaying;

  return fetchLastPlayed(accessToken);
}

export const getNowPlaying = getSpotifyTrack;