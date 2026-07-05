"use client";

import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import { listActiveRechargePromotion } from "@workspace/ui/services/user/promotion";
import { recharge } from "@workspace/ui/services/user/order";
import { unitConversion } from "@workspace/ui/utils/unit-conversions";
import { LoaderCircle } from "lucide-react";
import type React from "react";
import { useMemo, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import PaymentMethods from "./payment-methods";

// toNumber 容错转数字（兼容 string | number | null | undefined）
const toNumber = (value: unknown): number => {
  if (value === "" || value === null || value === undefined) return 0;
  const parsed = typeof value === "string" ? Number(value) : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

// pick 兼容 camelCase / snake_case（后端 proto JSON 序列化用 snake_case）
const pick = <T,>(obj: any, camel: string, snake: string): T | undefined =>
  obj?.[camel] ?? obj?.[snake];

// normalizePromo 规整后端返回的活动数据（兼容 snake_case）
const normalizePromo = (p: any) => ({
  id: p?.id,
  name: p?.name,
  description: p?.description,
  endTime: toNumber(pick(p, "endTime", "end_time")),
  stackMode: toNumber(pick(p, "stackMode", "stack_mode")),
  customBonusEnabled: !!pick(p, "customBonusEnabled", "custom_bonus_enabled"),
  customBonusPercent: toNumber(
    pick(p, "customBonusPercent", "custom_bonus_percent")
  ),
  tiers: (p?.tiers ?? []).map((tier: any) => ({
    amount: toNumber(tier?.amount),
    bonus: toNumber(tier?.bonus),
    label: tier?.label ?? "",
    sort: toNumber(tier?.sort),
  })),
});

export default function Recharge(
  props: Readonly<
    React.ComponentProps<typeof Button> & {
      defaultOpen?: boolean;
    }
  >
) {
  const { defaultOpen = false, ...buttonProps } = props;
  const { t } = useTranslation("subscribe");
  const { common } = useGlobalStore();
  const navigate = useNavigate();
  const { currency } = common;

  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [loading, startTransition] = useTransition();

  const [params, setParams] = useState<API.RechargeOrderRequest>({
    amount: "0",
    payment: "",
  });

  // 拉取当前生效的充值促销活动（接口失败时静默回退到无档位模式）
  const { data: promoData } = useQuery({
    queryKey: ["active-recharge-promotion"],
    queryFn: async () => {
      const { data } = await listActiveRechargePromotion();
      return data;
    },
    enabled: open, // 仅弹窗打开时拉取
    staleTime: 30_000,
  });

  const promotions = (promoData?.list ?? []).map(normalizePromo);

  // 当前金额（分）
  const amountCents = Number(params.amount || 0);
  // 当前金额（元），用于档位按钮高亮判断
  const amountDollars = unitConversion("centsToDollars", amountCents);

  // 计算当前金额的赠送额（用于实时提示）
  // 命中算法：遍历所有活动，档位精确匹配优先；否则若活动开 custom 按比例；
  // 多活动按 stack_mode 收敛（0=互斥取第一个命中，1=叠加求和）
  const currentBonusCents = useMemo(() => {
    if (amountCents <= 0 || promotions.length === 0) return 0;
    let total = 0;
    let stackMode = 0;
    let decided = false;
    for (const p of promotions) {
      let perBonus = 0;
      let hit = false;
      // 档位精确匹配优先
      for (const tier of p.tiers ?? []) {
        if (toNumber(tier.amount) === amountCents) {
          perBonus = toNumber(tier.bonus);
          hit = true;
          break;
        }
      }
      // 未命中档位，按自定义比例
      if (!hit && p.customBonusEnabled && toNumber(p.customBonusPercent) > 0) {
        perBonus = (amountCents * toNumber(p.customBonusPercent)) / 10000;
        hit = true;
      }
      if (!hit) continue;
      if (!decided) {
        stackMode = p.stackMode ?? 0;
        decided = true;
      }
      total += perBonus;
      if (stackMode === 0) break; // 互斥：取第一个命中即止
    }
    return total;
  }, [amountCents, promotions]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button {...buttonProps}>{t("recharge", "Recharge")}</Button>
      </DialogTrigger>
      <DialogContent className="flex h-full flex-col overflow-hidden md:h-auto">
        <DialogHeader>
          <DialogTitle>{t("balanceRecharge", "Balance Recharge")}</DialogTitle>
          <DialogDescription>
            {t("rechargeDescription", "Recharge your account balance")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between text-sm">
          <div className="grid gap-3">
            {/* 充值促销档位快捷按钮（仅当有有效活动时展示） */}
            {promotions.length > 0 && (
              <div className="grid gap-2">
                {promotions.map((promo) => (
                  <div key={promo.id} className="grid gap-2">
                    {promo.name && (
                      <div className="text-muted-foreground text-xs">
                        {promo.name}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(promo.tiers ?? [])
                        .slice()
                        .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
                        .map((tier, idx) => {
                          const tierDollars = unitConversion(
                            "centsToDollars",
                            toNumber(tier.amount)
                          );
                          const active = tierDollars === amountDollars;
                          return (
                            <Button
                              key={`${promo.id}-${tier.amount}-${idx}`}
                              size="sm"
                              type="button"
                              variant={active ? "default" : "outline"}
                              onClick={() => {
                                setParams((prev) => ({
                                  ...prev,
                                  amount: String(toNumber(tier.amount)),
                                }));
                              }}
                              className="relative flex flex-col items-center gap-0.5 py-2"
                            >
                              <span className="font-semibold">
                                {currency.currency_symbol}
                                {tierDollars}
                              </span>
                              {toNumber(tier.bonus) > 0 && (
                                <span className="text-[10px] opacity-80">
                                  {t("bonusGift", "Gift")} {currency.currency_symbol}
                                  {unitConversion("centsToDollars", toNumber(tier.bonus))}
                                </span>
                              )}
                              {tier.label && (
                                <span className="bg-primary-foreground text-primary absolute -top-1.5 -right-1.5 rounded-full px-1.5 text-[9px] font-semibold">
                                  {tier.label}
                                </span>
                              )}
                            </Button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="font-semibold">
              {t("rechargeAmount", "Recharge Amount")}
            </div>
            <div className="flex">
              <EnhancedInput
                formatInput={(value) => unitConversion("centsToDollars", value)}
                formatOutput={(value) =>
                  unitConversion("dollarsToCents", value)
                }
                min={0}
                onValueChange={(value) => {
                  setParams((prev) => ({
                    ...prev,
                    amount: String(value ?? 0),
                  }));
                }}
                placeholder={t("enterAmount", "Enter Amount")}
                prefix={currency.currency_symbol}
                suffix={currency.currency_unit}
                type="number"
                value={Number(params.amount || 0)}
              />
            </div>
            {/* 赠送提示（仅当当前金额有赠送时展示） */}
            {currentBonusCents > 0 && (
              <div className="text-muted-foreground text-xs">
                {t("bonusGift", "Gift")} {currency.currency_symbol}
                {unitConversion("centsToDollars", currentBonusCents)}
              </div>
            )}
            <PaymentMethods
              balance={false}
              onChange={(value) =>
                setParams((prev) => ({ ...prev, payment: value }))
              }
              value={params.payment}
            />
          </div>
          <Button
            className="fixed bottom-0 left-0 w-full rounded-none md:relative md:mt-6"
            disabled={
              loading || Number(params.amount || 0) <= 0 || !params.payment
            }
            onClick={() => {
              startTransition(async () => {
                try {
                  const response = await recharge(params);
                  const orderNo = response.data.data?.order_no;
                  if (orderNo) {
                    navigate({
                      to: "/payment",
                      search: { order_no: String(orderNo) },
                    });
                    setOpen(false);
                  }
                } catch (_error) {
                  /* empty */
                }
              });
            }}
          >
            {loading && <LoaderCircle className="mr-2 animate-spin" />}
            {t("rechargeNow", "Recharge Now")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
