type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id: string;
  inverse?: boolean;
  titleStyle?: "serif" | "script";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  inverse = false,
  titleStyle = "serif",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";
  const eyebrowColor = inverse ? "text-[#e7afc2]" : "text-[#b54870]";
  const bodyColor = inverse ? "text-white/70" : titleStyle === "script" ? "text-[#a84a6c]" : "text-muted";
  const bodyTypography = titleStyle === "script" ? "font-serif italic" : "font-sans";
  const titleTypography = titleStyle === "script"
    ? `font-script text-[clamp(3.75rem,9vw,7rem)] leading-[1.02] font-normal tracking-normal ${inverse ? "text-[#efcc82]" : "text-accent"}`
    : "font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.045em]";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <p className={`font-sans text-[0.68rem] font-semibold tracking-[0.3em] uppercase ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-4 ${titleTypography}`}>
        {title}
      </h2>
      {titleStyle === "script" ? (
        <div aria-hidden="true" className={`mt-5 flex items-center gap-3 ${inverse ? "text-[#efcc82]" : "text-accent"}`}>
          <span className="h-px w-14 bg-current/55" />
          <span className="text-sm leading-none">&hearts;</span>
          <span className="h-px w-14 bg-current/55" />
        </div>
      ) : null}
      {description ? <p className={`mt-6 max-w-2xl text-base leading-8 ${bodyTypography} ${bodyColor}`}>{description}</p> : null}
    </div>
  );
}
