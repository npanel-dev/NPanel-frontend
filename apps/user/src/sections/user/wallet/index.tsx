"use client";

import { useSearch } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  ProList,
  type ProListActions,
} from "@workspace/ui/composed/pro-list/pro-list";
import {
  commissionWithdraw,
  queryUserBalanceLog,
  queryWithdrawalLog,
  transferCommissionToBalance,
} from "@workspace/ui/services/user/user";
import { formatDate } from "@workspace/ui/utils/formatting";
import { ArrowRightLeft, Banknote, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Display } from "@/components/display";
import Recharge from "@/sections/subscribe/recharge";
import { useGlobalStore } from "@/stores/global";

type WithdrawalMethod = {
  method: string;
  label: string;
  enabled?: boolean;
};

const DEFAULT_WITHDRAWAL_METHODS: WithdrawalMethod[] = [
  { method: "alipay", label: "Alipay", enabled: true },
  { method: "wechat", label: "WeChat", enabled: true },
  { method: "usdt", label: "USDT", enabled: true },
];

function toNumber(value?: number | string | null) {
  const parsed = typeof value === "string" ? Number(value) : Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function moneyInputToCents(value: string) {
  const trimmed = value.trim();
  if (!/^\d+(\.\d{0,2})?$/.test(trimmed)) return 0;
  const [yuan = "0", cents = ""] = trimmed.split(".");
  const amount = Number.parseInt(yuan, 10) * 100;
  const fraction = Number.parseInt(cents.padEnd(2, "0").slice(0, 2), 10) || 0;
  return amount + fraction;
}

function normalizeMethod(value?: string | null) {
  const method = String(value || "")
    .trim()
    .toLowerCase();
  return method === "ustd" ? "usdt" : method;
}

function parseWithdrawalMethods(raw?: string | null): WithdrawalMethod[] {
  if (!raw) return DEFAULT_WITHDRAWAL_METHODS;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const methods = parsed
        .map((item) => {
          if (typeof item === "string") {
            return {
              method: normalizeMethod(item),
              label: item,
              enabled: true,
            };
          }
          return {
            method: normalizeMethod(item?.method),
            label: String(item?.label || item?.method || ""),
            enabled: item?.enabled !== false,
          };
        })
        .filter((item) => item.method && item.enabled);
      return methods;
    }
  } catch {
    const methods = raw
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => ({
        method: normalizeMethod(item),
        label: item,
        enabled: true,
      }));
    if (methods.length) return methods;
  }
  return DEFAULT_WITHDRAWAL_METHODS;
}

function getField<T>(source: unknown, snakeKey: string, camelKey: string) {
  const record = (source || {}) as Record<string, T>;
  return record[snakeKey] ?? record[camelKey];
}

export default function Wallet() {
  const { t } = useTranslation("wallet");
  const search = useSearch({ strict: false }) as { recharge?: string };
  const typeMap: Record<number, string> = {
    0: t("type.0", "Type"),
    1: t("type.1", "Recharge"),
    2: t("type.2", "Withdrawal"),
    3: t("type.3", "Purchase"),
    4: t("type.4", "Refund"),
    5: t("type.5", "Reward"),
    6: t("type.6", "Commission"),
    231: t("type.231", "Auto Reset"),
    232: t("type.232", "Advance Reset"),
    233: t("type.233", "Paid Reset"),
    321: t("type.321", "Recharge"),
    322: t("type.322", "Withdraw"),
    323: t("type.323", "Payment"),
    324: t("type.324", "Refund"),
    325: t("type.325", "Reward"),
    326: t("type.326", "Admin Adjust"),
    327: t("type.327", "Commission Transfer"),
    331: t("type.331", "Purchase"),
    332: t("type.332", "Renewal"),
    333: t("type.333", "Refund"),
    334: t("type.334", "Withdraw"),
    335: t("type.335", "Admin Adjust"),
    336: t("type.336", "Transfer to Balance"),
    341: t("type.341", "Increase"),
    342: t("type.342", "Reduce"),
  };
  const { common, getUserInfo, user } = useGlobalStore();
  const balanceLogRef = useRef<ProListActions>(null);
  const withdrawalLogRef = useRef<ProListActions>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [withdrawContent, setWithdrawContent] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const totalAssets =
    toNumber(user?.balance) +
    toNumber(user?.commission) +
    toNumber(user?.gift_amount);
  const inviteConfig = common?.invite || {};
  const withdrawalMinAmount = toNumber(
    getField(inviteConfig, "withdrawal_min_amount", "withdrawalMinAmount")
  );
  const withdrawalMethods = useMemo(
    () =>
      parseWithdrawalMethods(
        getField<string>(
          inviteConfig,
          "withdrawal_methods",
          "withdrawalMethods"
        )
      ),
    [inviteConfig]
  );
  const selectedMethod = withdrawalMethods.find(
    (item) => item.method === withdrawMethod
  );
  const hasWithdrawalMethods = withdrawalMethods.length > 0;

  useEffect(() => {
    if (!hasWithdrawalMethods) {
      if (withdrawMethod) {
        setWithdrawMethod("");
      }
      return;
    }
    const firstMethod = withdrawalMethods[0]?.method;
    if (
      firstMethod &&
      !withdrawalMethods.some((item) => item.method === withdrawMethod)
    ) {
      setWithdrawMethod(firstMethod);
    }
  }, [hasWithdrawalMethods, withdrawMethod, withdrawalMethods]);

  async function submitWithdraw() {
    const amount = moneyInputToCents(withdrawAmount);
    if (amount <= 0) {
      toast.error(t("invalidAmount", "Please enter a valid amount"));
      return;
    }
    if (!hasWithdrawalMethods) {
      toast.error(t("selectMethod", "Please select a withdrawal method"));
      return;
    }
    if (!withdrawMethod) {
      toast.error(t("selectMethod", "Please select a withdrawal method"));
      return;
    }
    if (!withdrawContent.trim()) {
      toast.error(
        t("accountRequired", "Please enter the receiving account information")
      );
      return;
    }
    setLoading(true);
    try {
      await commissionWithdraw({
        amount,
        content: withdrawContent.trim(),
        method: withdrawMethod,
      });
      toast.success(t("withdrawSuccess", "Withdrawal request submitted"));
      setWithdrawAmount("");
      setWithdrawContent("");
      setWithdrawOpen(false);
      await getUserInfo();
      withdrawalLogRef.current?.refresh();
      balanceLogRef.current?.refresh();
    } catch (_error) {
      toast.error(t("withdrawFailed", "Failed to submit withdrawal"));
    } finally {
      setLoading(false);
    }
  }

  async function submitTransfer() {
    const amount = moneyInputToCents(transferAmount);
    if (amount <= 0) {
      toast.error(t("invalidAmount", "Please enter a valid amount"));
      return;
    }
    setLoading(true);
    try {
      await transferCommissionToBalance({ amount });
      toast.success(t("transferSuccess", "Commission transferred to balance"));
      setTransferAmount("");
      setTransferOpen(false);
      await getUserInfo();
      withdrawalLogRef.current?.refresh();
      balanceLogRef.current?.refresh();
    } catch (_error) {
      toast.error(t("transferFailed", "Failed to transfer commission"));
    } finally {
      setLoading(false);
    }
  }

  const statusMap: Record<number, string> = {
    0: t("withdrawalStatus.pending", "Pending"),
    1: t("withdrawalStatus.approved", "Approved"),
    2: t("withdrawalStatus.rejected", "Rejected"),
  };

  return (
    <>
      <Card>
        <CardContent>
          <h2 className="mb-4 font-bold text-2xl text-foreground">
            {t("assetOverview", "Asset Overview")}
          </h2>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">
                  {t("totalAssets", "Total Assets")}
                </p>
                <p className="font-bold text-3xl">
                  <Display type="currency" value={totalAssets} />
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Recharge defaultOpen={search.recharge === "1"} />
                <Button
                  onClick={() => setTransferOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  <ArrowRightLeft className="size-4" />
                  {t("transferToBalance", "Transfer to Balance")}
                </Button>
                {hasWithdrawalMethods && (
                  <Button onClick={() => setWithdrawOpen(true)} size="sm">
                    <Banknote className="size-4" />
                    {t("withdrawCommission", "Withdraw Commission")}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-secondary p-4 shadow-sm transition-all duration-300 hover:shadow-md">
              <p className="font-medium text-secondary-foreground text-sm opacity-80">
                {t("balance", "Balance")}
              </p>
              <p className="font-bold text-2xl text-secondary-foreground">
                <Display type="currency" value={user?.balance} />
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4 shadow-sm transition-all duration-300 hover:shadow-md">
              <p className="font-medium text-secondary-foreground text-sm opacity-80">
                {t("giftAmount", "Gift Amount")}
              </p>
              <p className="font-bold text-2xl text-secondary-foreground">
                <Display type="currency" value={user?.gift_amount} />
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4 shadow-sm transition-all duration-300 hover:shadow-md">
              <p className="font-medium text-secondary-foreground text-sm opacity-80">
                {t("commission", "Commission")}
              </p>
              <p className="font-bold text-2xl text-secondary-foreground">
                <Display type="currency" value={user?.commission} />
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-muted-foreground text-sm">
            {t(
              "balanceUsageNotice",
              "Balance can be used to purchase your own plans and cannot be withdrawn."
            )}
            {withdrawalMinAmount > 0 && (
              <span className="ml-2">
                {t("minimumWithdrawal", "Minimum withdrawal")}{" "}
                <Display type="currency" value={withdrawalMinAmount} />
              </span>
            )}
          </div>
        </CardContent>
      </Card>
      <ProList<API.BalanceLog, Record<string, unknown>>
        action={balanceLogRef}
        header={{ title: t("balanceRecords", "Balance Records") }}
        renderItem={(item) => (
          <Card className="overflow-hidden">
            <CardContent className="text-sm">
              <ul className="grid grid-cols-2 gap-3 *:flex *:flex-col lg:grid-cols-4">
                <li className="font-semibold">
                  <span className="text-muted-foreground">
                    {t("createdAt", "Created At")}
                  </span>
                  <time>{formatDate(item.timestamp)}</time>
                </li>
                <li className="font-semibold">
                  <span className="text-muted-foreground">
                    {t("type.0", "Type")}
                  </span>
                  <span>
                    {typeMap[toNumber(item.type)] ||
                      t(`type.${toNumber(item.type)}`, "Unknown Type")}
                  </span>
                </li>
                <li className="font-semibold">
                  <span className="text-muted-foreground">
                    {t("amount", "Amount")}
                  </span>
                  <span>
                    <Display type="currency" value={item.amount} />
                  </span>
                </li>

                <li>
                  <span className="text-muted-foreground">
                    {t("balance", "Balance")}
                  </span>
                  <span>
                    <Display type="currency" value={item.balance} />
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
        request={async (pagination, filter) => {
          const response = await queryUserBalanceLog({
            ...pagination,
            ...filter,
          });
          return {
            list: response.data.data?.list || [],
            total: Number(response.data.data?.total || 0),
          };
        }}
      />
      <ProList<API.WithdrawalLog, Record<string, unknown>>
        action={withdrawalLogRef}
        header={{ title: t("withdrawalRecords", "Withdrawal Records") }}
        renderItem={(item) => {
          const status = toNumber(getField(item, "status", "status"));
          const method = normalizeMethod(getField(item, "method", "method"));
          return (
            <Card className="overflow-hidden">
              <CardContent className="text-sm">
                <ul className="grid grid-cols-2 gap-3 *:flex *:flex-col lg:grid-cols-4">
                  <li className="font-semibold">
                    <span className="text-muted-foreground">
                      {t("createdAt", "Created At")}
                    </span>
                    <time>
                      {formatDate(getField(item, "created_at", "createdAt"))}
                    </time>
                  </li>
                  <li className="font-semibold">
                    <span className="text-muted-foreground">
                      {t("method", "Method")}
                    </span>
                    <span>{method.toUpperCase() || "-"}</span>
                  </li>
                  <li className="font-semibold">
                    <span className="text-muted-foreground">
                      {t("amount", "Amount")}
                    </span>
                    <Display
                      type="currency"
                      value={getField(item, "amount", "amount")}
                    />
                  </li>
                  <li className="font-semibold">
                    <span className="text-muted-foreground">
                      {t("status", "Status")}
                    </span>
                    <Badge variant={status === 2 ? "destructive" : "outline"}>
                      {statusMap[status] || t("unknown", "Unknown")}
                    </Badge>
                  </li>
                  <li className="col-span-2 lg:col-span-4">
                    <span className="text-muted-foreground">
                      {t("receivingAccount", "Receiving Account")}
                    </span>
                    <span className="break-all">
                      {getField(item, "content", "content") || "-"}
                    </span>
                  </li>
                  {getField<string>(item, "reason", "reason") && (
                    <li className="col-span-2 lg:col-span-4">
                      <span className="text-muted-foreground">
                        {t("reason", "Reason")}
                      </span>
                      <span>{getField<string>(item, "reason", "reason")}</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          );
        }}
        request={async (pagination, filter) => {
          const response = await queryWithdrawalLog({
            ...pagination,
            ...filter,
          });
          return {
            list: response.data.list || response.data.data?.list || [],
            total: Number(
              response.data.total || response.data.data?.total || 0
            ),
          };
        }}
      />

      <Dialog onOpenChange={setWithdrawOpen} open={withdrawOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("withdrawCommission", "Withdraw Commission")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "withdrawDescription",
                "Submit a commission withdrawal request for administrator review."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="font-medium text-sm" htmlFor="withdraw-amount">
                {t("amount", "Amount")}
              </label>
              <Input
                id="withdraw-amount"
                inputMode="decimal"
                min="0"
                onChange={(event) => setWithdrawAmount(event.target.value)}
                placeholder="0.00"
                step="0.01"
                type="number"
                value={withdrawAmount}
              />
            </div>
            <div className="grid gap-2">
              <label className="font-medium text-sm" htmlFor="withdraw-method">
                {t("method", "Method")}
              </label>
              <Select onValueChange={setWithdrawMethod} value={withdrawMethod}>
                <SelectTrigger className="w-full" id="withdraw-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {withdrawalMethods.map((item) => (
                    <SelectItem key={item.method} value={item.method}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="font-medium text-sm" htmlFor="withdraw-account">
                {t("receivingAccount", "Receiving Account")}
              </label>
              <Textarea
                id="withdraw-account"
                onChange={(event) => setWithdrawContent(event.target.value)}
                placeholder={t(
                  "receivingAccountPlaceholder",
                  "Enter your account, QR information, or wallet address"
                )}
                value={withdrawContent}
              />
              {selectedMethod && (
                <p className="text-muted-foreground text-xs">
                  {t("selectedMethod", "Selected method")}:{" "}
                  {selectedMethod.label}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={() => setWithdrawOpen(false)}
              variant="outline"
            >
              {t("cancel", "Cancel")}
            </Button>
            <Button disabled={loading} onClick={submitWithdraw}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              {t("submit", "Submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog onOpenChange={setTransferOpen} open={transferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("transferToBalance", "Transfer to Balance")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "transferDescription",
                "Transfer commission into balance. Balance can only be used for your own purchases."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <label className="font-medium text-sm" htmlFor="transfer-amount">
              {t("amount", "Amount")}
            </label>
            <Input
              id="transfer-amount"
              inputMode="decimal"
              min="0"
              onChange={(event) => setTransferAmount(event.target.value)}
              placeholder="0.00"
              step="0.01"
              type="number"
              value={transferAmount}
            />
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={() => setTransferOpen(false)}
              variant="outline"
            >
              {t("cancel", "Cancel")}
            </Button>
            <Button disabled={loading} onClick={submitTransfer}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              {t("confirmTransfer", "Confirm Transfer")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
