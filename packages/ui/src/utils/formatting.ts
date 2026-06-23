import { differenceInMilliseconds, intlFormat } from "date-fns";

function toSafeNumber(value?: Date | number | string | null) {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;

    const parsedDate = Date.parse(value);
    return Number.isFinite(parsedDate) ? parsedDate : 0;
  }
  return 0;
}

function normalizeTimestamp(value: number) {
  return value > 0 && value < 10000000000 ? value * 1000 : value;
}

export function formatBytes(bytes: number | string) {
  const numericBytes = toSafeNumber(bytes);
  if (numericBytes <= 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(numericBytes) / Math.log(k));

  return `${(numericBytes / k ** i).toFixed(2)} ${sizes[i]}`;
}

export function formatDate(date?: Date | number | string, showTime = true) {
  if (date === undefined || date === null || date === "") return;

  if (date instanceof Date) {
    return intlFormat(date, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      ...(showTime && {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
      hour12: false,
    });
  }

  const numericDate = normalizeTimestamp(toSafeNumber(date));
  if (!numericDate) return;

  return intlFormat(numericDate, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...(showTime && {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
    hour12: false,
  });
}

export function differenceInDays(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
) {
  const left = dateLeft instanceof Date ? dateLeft : normalizeTimestamp(toSafeNumber(dateLeft));
  const right =
    dateRight instanceof Date ? dateRight : normalizeTimestamp(toSafeNumber(dateRight));
  const diffInMs = differenceInMilliseconds(left, right);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  if (diffInDays >= 1) return diffInDays.toFixed(0);
  return Number(diffInDays.toFixed(2));
}
