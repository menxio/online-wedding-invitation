type MonogramProps = {
  initials: string;
  compact?: boolean;
  className?: string;
};

function getInitialPair(initials: string) {
  const characters = initials.match(/[\p{L}\p{N}]/gu) ?? [];
  return [characters[0] ?? "?", characters[1] ?? characters[0] ?? "?"];
}

type InitialLockupProps = {
  first: string;
  second: string;
  compact?: boolean;
};

function InitialLockup({ first, second, compact = false }: InitialLockupProps) {
  const initialSize = compact ? 27 : 102;
  const ampersandSize = compact ? 14 : 38;
  const spacingBeforeAmpersand = compact ? 5 : 12;
  const spacingAfterAmpersand = compact ? 8 : 19;
  const baseline = compact ? 30 : 193;
  const ampersandLift = compact ? -2 : -7;

  return (
    <text
      x={compact ? 52 : 160}
      y={baseline}
      textAnchor="middle"
      fontWeight="400"
      aria-hidden="true"
    >
      <tspan fill="#fff9f1" fontFamily="var(--font-display)" fontSize={initialSize}>
        {first}
      </tspan>
      <tspan
        dx={spacingBeforeAmpersand}
        dy={ampersandLift}
        fill="#d7b66e"
        fontFamily="var(--font-script)"
        fontSize={ampersandSize}
      >
        &amp;
      </tspan>
      <tspan
        dx={spacingAfterAmpersand}
        dy={-ampersandLift}
        fill="#fff9f1"
        fontFamily="var(--font-display)"
        fontSize={initialSize}
      >
        {second}
      </tspan>
    </text>
  );
}

function BotanicalBranch() {
  return (
    <g
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M67 253C90 274 120 286 156 289"
        fill="none"
        strokeOpacity="0.82"
        strokeWidth="1.4"
      />
      <path
        d="M90 270c-13-1-23-10-27-23 14 2 24 10 27 23Z"
        strokeOpacity="0.72"
        strokeWidth="1.05"
      />
      <path
        d="M105 278c-2-13 3-24 15-31 3 14-2 25-15 31Z"
        strokeOpacity="0.72"
        strokeWidth="1.05"
      />
      <path
        d="M132 286c-14-3-23-12-26-25 14 3 23 11 26 25Z"
        strokeOpacity="0.72"
        strokeWidth="1.05"
      />
    </g>
  );
}

export function Monogram({ initials, compact = false, className = "" }: MonogramProps) {
  const [first, second] = getInitialPair(initials);
  const accessibleName = compact
    ? `${first} and ${second} monogram`
    : `${first} and ${second} wedding monogram`;

  if (compact) {
    return (
      <span
        role="img"
        aria-label={accessibleName}
        className={`inline-block h-10 w-[5.75rem] text-[#d7b66e] ${className}`}
      >
        <svg viewBox="0 0 104 44" className="h-full w-full" aria-hidden="true">
          <ellipse
            cx="52"
            cy="22"
            rx="49"
            ry="19.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.68"
            strokeWidth="0.9"
          />
          <InitialLockup first={first} second={second} compact />
        </svg>
      </span>
    );
  }

  return (
    <span role="img" aria-label={accessibleName} className={`block ${className}`}>
      <svg viewBox="0 0 320 320" className="h-auto w-full" aria-hidden="true">
        <path
          d="M67 253A132 132 0 1 1 253 253"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeOpacity="0.76"
          strokeWidth="1.4"
        />

        <InitialLockup first={first} second={second} />

        <BotanicalBranch />
        <g transform="translate(320 0) scale(-1 1)">
          <BotanicalBranch />
        </g>
        <circle cx="160" cy="289" r="2.4" fill="currentColor" fillOpacity="0.82" />
      </svg>
    </span>
  );
}
