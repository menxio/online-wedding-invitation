import type { CSSProperties, ReactNode } from "react";
import type { WeddingThemeConfig } from "@/config";

type ThemeProperties = CSSProperties & Record<`--wedding-${string}`, string>;

type WeddingThemeProps = {
  children: ReactNode;
  theme: WeddingThemeConfig;
};

export function WeddingTheme({ children, theme }: WeddingThemeProps) {
  const properties: ThemeProperties = {
    "--wedding-color-background": theme.colors.background,
    "--wedding-color-surface": theme.colors.surface,
    "--wedding-color-text": theme.colors.text,
    "--wedding-color-muted": theme.colors.muted,
    "--wedding-color-primary": theme.colors.primary,
    "--wedding-color-accent": theme.colors.accent,
    "--wedding-color-border": theme.colors.border,
    "--wedding-spacing-section": theme.spacing.section,
    "--wedding-spacing-content": theme.spacing.content,
    "--wedding-border-width": theme.borders.width,
    "--wedding-border-style": theme.borders.style,
    "--wedding-radius-small": theme.radius.small,
    "--wedding-radius-medium": theme.radius.medium,
    "--wedding-radius-large": theme.radius.large,
    "--wedding-shadow-soft": theme.shadows.soft,
    "--wedding-motion-fast": theme.motion.fast,
    "--wedding-motion-base": theme.motion.base,
    "--wedding-motion-slow": theme.motion.slow,
    "--wedding-photo-radius": theme.photography.radius,
    "--wedding-photo-overlay": theme.photography.overlay,
  };

  return <div style={properties}>{children}</div>;
}
