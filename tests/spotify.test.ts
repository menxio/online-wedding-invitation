import { describe, expect, it } from "vitest";
import { getSpotifyEmbedUrl } from "@/lib/spotify";

describe("Spotify embed URLs", () => {
  it("converts a Spotify track URL into a safe embed URL", () => {
    expect(getSpotifyEmbedUrl("https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6?si=test")).toBe(
      "https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6?utm_source=generator&theme=0",
    );
  });

  it("supports localized Spotify paths", () => {
    expect(getSpotifyEmbedUrl("https://open.spotify.com/intl-en/playlist/37i9dQZF1DXcBWIGoYBM5M")).toBe(
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0",
    );
  });

  it("rejects non-Spotify and unsupported Spotify URLs", () => {
    expect(getSpotifyEmbedUrl("https://example.com/track/abc")).toBeNull();
    expect(getSpotifyEmbedUrl("https://open.spotify.com/user/example")).toBeNull();
  });
});
