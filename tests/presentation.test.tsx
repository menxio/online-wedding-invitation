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

  it("renders the approved local recording with a guest-controlled play button", () => {
    const { container } = render(createElement(MusicControl, { music: weddingConfig.music }));

    expect(container.querySelector("audio")).toHaveAttribute("src", "/music/born-for-you.mp3");
    expect(screen.getByRole("button", { name: "Play Born For You by Wedding recording" })).toBeInTheDocument();
    expect(screen.queryByTitle(/Spotify/i)).not.toBeInTheDocument();
  });
});
