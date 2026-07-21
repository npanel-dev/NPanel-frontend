import { describe, expect, it } from "vitest";
import {
  toExpiryEndOfDay,
  toUnixMilliseconds,
  toUnixSeconds,
} from "./subscription-expiry";

describe("subscription expiry timestamps", () => {
  it("converts API seconds to date-picker milliseconds", () => {
    expect(toUnixMilliseconds(1_784_592_000)).toBe(1_784_592_000_000);
  });

  it("converts date-picker milliseconds to API seconds", () => {
    expect(toUnixSeconds(1_784_592_000_000)).toBe(1_784_592_000);
  });

  it("uses the end of the selected local day", () => {
    const selected = new Date(2026, 6, 21, 12, 0, 0, 0).getTime();
    const expiry = new Date(toExpiryEndOfDay(selected));
    expect([
      expiry.getHours(),
      expiry.getMinutes(),
      expiry.getSeconds(),
      expiry.getMilliseconds(),
    ]).toEqual([23, 59, 59, 999]);
  });
});
