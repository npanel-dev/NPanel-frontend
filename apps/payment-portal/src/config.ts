const DEFAULT_AMOUNTS = [10, 20, 50, 100];
const DEFAULT_NEWS = [
  "Existing backend login is reused directly for authentication.",
  "Enabled payment methods are loaded from the current portal payment API.",
  "Recharge records keep using the existing order list interface.",
];

// RechargeAmount 充值档位（升级版：可承载 bonus/label）
// 兼容：env 解析的兜底档位只有 amount，bonus/label 为空
export interface RechargeAmount {
  amount: number; // 充值金额（元）
  bonus?: number; // 赠送金额（元），来自后端 tier.bonus（需 cents→dollars）
  label?: string; // 档位标签（如「热门」「推荐」），来自后端 tier.label
}

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

// parseAmounts 解析 env 兜底档位（仅 amount，无 bonus/label）
function parseAmounts(value?: string): RechargeAmount[] {
  if (!value) return DEFAULT_AMOUNTS.map((amount) => ({ amount }));

  const parsed = value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item) && item > 0);

  return parsed.length > 0
    ? parsed.map((amount) => ({ amount }))
    : DEFAULT_AMOUNTS.map((amount) => ({ amount }));
}

function parseNews(value?: string): string[] {
  if (!value) return DEFAULT_NEWS;

  const parsed = value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : DEFAULT_NEWS;
}

export const fallbackLng = "en-US";
export const supportedLngs = ["en-US", "zh-CN"] as const;

export const portalConfig = {
  currency: import.meta.env.VITE_PAYMENT_PORTAL_CURRENCY ,
  rechargeAmounts: parseAmounts(import.meta.env.VITE_PAYMENT_PORTAL_AMOUNTS),
  minCustomAmount: Math.max(
    parseNumber(import.meta.env.VITE_PAYMENT_PORTAL_MIN_CUSTOM_AMOUNT, 1),
    1
  ),
  newsItems: parseNews(import.meta.env.VITE_PAYMENT_PORTAL_NEWS),
};
