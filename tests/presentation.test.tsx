import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { FallingPetals } from "@/components/effects/falling-petals";
import { MusicControl } from "@/components/sections/music-control";
import { weddingConfig } from "@/config";

describe("invitation presentation", () => {
  it("uses fewer petals for content-heavy sections", () => {
    const { container } = render(createElement(FallingPetals, { density: "sparse" }));
    expect(container.querySelectorAll(".falling-petal")).toHaveLength(6);
  });

  it("renders the approved Spotify track as an embed", () => {
    render(createElement(MusicControl, { music: weddingConfig.music }));

    const player = screen.getByTitle("Born For You by Khel Pangilinan on Spotify");
    expect(player).toHaveAttribute(
      "src",
      "https://open.spotify.com/embed/track/4Lc58oXRm2wo8lG28FYhIK?utm_source=generator&theme=0",
    );
  });
});
