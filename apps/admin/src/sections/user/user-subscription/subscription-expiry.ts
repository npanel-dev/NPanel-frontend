import { endOfDay } from "date-fns";

const unixMillisecondsThreshold = 10_000_000_000;

function toNumber(value: number | string | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function toUnixMilliseconds(value: number | string | null | undefined) {
  const parsed = toNumber(value);
  if (!parsed) return 0;
  return parsed < unixMillisecondsThreshold ? parsed * 1000 : parsed;
}

export function toUnixSeconds(value: number | null | undefined) {
  const parsed = toNumber(value);
  if (!parsed) return 0;
  return parsed >= unixMillisecondsThreshold
    ? Math.floor(parsed / 1000)
    : parsed;
}

export function toExpiryEndOfDay(value: number | null | undefined) {
  const parsed = toNumber(value);
  if (!parsed) return 0;
  return endOfDay(new Date(parsed)).getTime();
}
