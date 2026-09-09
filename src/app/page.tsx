import { WeddingInvitation } from "@/components/invitation/wedding-invitation";
import { WeddingTheme } from "@/components/theme/wedding-theme";
import { sectionsConfig, themeConfig, weddingConfig } from "@/config";

export default function Home() {
  return (
    <WeddingTheme theme={themeConfig}>
      <WeddingInvitation wedding={weddingConfig} sections={sectionsConfig} />
    </WeddingTheme>
  );
}
