export type Countdown =
  | { status: "placeholder" }
  | { status: "complete"; days: 0; hours: 0; minutes: 0; seconds: 0 }
  | { status: "upcoming"; days: number; hours: number; minutes: number; seconds: number };

export function getCountdown(target: string, now = new Date()): Countdown {
  if (target === "WEDDING_DATE" || target === "NEEDS COUPLE APPROVAL") {
    return { status: "placeholder" };
  }

  const remainingMilliseconds = new Date(target).getTime() - now.getTime();
  if (!Number.isFinite(remainingMilliseconds) || remainingMilliseconds <= 0) {
    return { status: "complete", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(remainingMilliseconds / 1000);
  return {
    status: "upcoming",
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}
