const SUPPORTED_SPOTIFY_TYPES = new Set(["album", "artist", "episode", "playlist", "show", "track"]);

export function getSpotifyEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "open.spotify.com") return null;

    const segments = url.pathname.split("/").filter(Boolean);
    if (segments[0]?.startsWith("intl-")) segments.shift();
    if (segments[0] === "embed") segments.shift();

    const [type, id] = segments;
    if (!type || !id || !SUPPORTED_SPOTIFY_TYPES.has(type) || !/^[a-zA-Z0-9]+$/.test(id)) {
      return null;
    }

    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}
