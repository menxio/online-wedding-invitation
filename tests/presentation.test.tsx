import { fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { FallingPetals } from "@/components/effects/falling-petals";
import { EntourageCarousel } from "@/components/sections/entourage-carousel";
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

  it("organizes the entourage into explicit, guest-controlled categories", () => {
    render(createElement(EntourageCarousel, { groups: weddingConfig.entourage }));

    expect(screen.getByRole("tab", { name: "Principal Sponsors" })).toHaveAttribute("aria-selected", "true");
    expect(within(screen.getByRole("tabpanel", { name: "Principal Sponsors" })).getByText("Ronnie B. Rubiato")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Secondary Sponsors" }));

    const secondaryPanel = screen.getByRole("tabpanel", { name: "Secondary Sponsors" });
    expect(within(secondaryPanel).getByText("Candle Sponsors")).toBeInTheDocument();
    expect(within(secondaryPanel).getByText("Mark Louis R. Rubiato")).toBeInTheDocument();
  });
});
