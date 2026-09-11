import type { CSSProperties } from "react";

const petals = [
  [5, 0, 13, 0.75], [14, 5, 17, 0.95], [24, 1, 14, 0.7], [36, 8, 19, 0.85],
  [48, 3, 16, 1], [59, 10, 13, 0.7], [68, 2, 18, 0.9], [77, 7, 14, 0.75],
  [86, 4, 17, 0.95], [94, 11, 13, 0.7], [30, 13, 15, 0.85], [72, 15, 16, 0.8],
] as const;

type PetalStyle = CSSProperties & {
  "--petal-left": string;
  "--petal-delay": string;
  "--petal-duration": string;
  "--petal-scale": number;
};

export function FallingPetals() {
  return (
    <div className="petal-field pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map(([left, delay, duration, scale], index) => {
        const style: PetalStyle = {
          "--petal-left": `${left}%`,
          "--petal-delay": `-${delay}s`,
          "--petal-duration": `${duration}s`,
          "--petal-scale": scale,
        };
        return <span key={`${left}-${index}`} className="falling-petal" style={style} />;
      })}
    </div>
  );
}
