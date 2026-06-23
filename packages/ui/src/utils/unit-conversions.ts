import { evaluate, format } from "mathjs";

type ConversionType =
  | "centsToDollars"
  | "dollarsToCents"
  | "bitsToMb"
  | "mbToBits"
  | "bytesToGb"
  | "gbToBytes";

const conversionConfig: Record<
  ConversionType,
  { convert: (value: number) => number; precision: number }
> = {
  centsToDollars: { convert: (value) => value / 100, precision: 2 },
  dollarsToCents: { convert: (value) => value * 100, precision: 0 },
  bitsToMb: { convert: (value) => value / 1024 / 1024, precision: 2 },
  mbToBits: { convert: (value) => value * 1024 * 1024, precision: 0 },
  bytesToGb: { convert: (value) => value / 1024 / 1024 / 1024, precision: 2 },
  gbToBytes: { convert: (value) => value * 1024 * 1024 * 1024, precision: 0 },
};

export function unitConversion(type: ConversionType, value?: number | string) {
  if (value === undefined || value === null || value === "") return 0;

  const numericValue =
    typeof value === "string" ? Number.parseFloat(value) : value;
  if (!Number.isFinite(numericValue)) return 0;

  const config = conversionConfig[type];
  if (!config) throw new Error("Invalid conversion type");

  const result = config.convert(numericValue);
  return Number(
    format(result, { notation: "fixed", precision: config.precision })
  );
}

export function evaluateWithPrecision(expression: string) {
  const result = evaluate(expression);
  const formatted = format(result, { notation: "fixed", precision: 2 });
  return Number(formatted);
}
