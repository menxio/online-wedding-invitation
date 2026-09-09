type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id: string;
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  inverse = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";
  const eyebrowColor = inverse ? "text-accent" : "text-primary";
  const bodyColor = inverse ? "text-white/70" : "text-muted";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <p className={`font-sans text-[0.68rem] font-semibold tracking-[0.3em] uppercase ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.045em]">
        {title}
      </h2>
      {description ? <p className={`mt-6 max-w-2xl font-sans text-base leading-8 ${bodyColor}`}>{description}</p> : null}
    </div>
  );
}
