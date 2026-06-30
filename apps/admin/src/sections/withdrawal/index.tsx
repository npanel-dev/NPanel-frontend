"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Textarea } from "@workspace/ui/components/textarea";
import { ConfirmButton } from "@workspace/ui/composed/confirm-button";
import {
  ProTable,
  type ProTableActions,
} from "@workspace/ui/composed/pro-table/pro-table";
import {
  type GetWithdrawalListParams,
  type WithdrawalRecord,
  withdrawalServiceApproveWithdrawal,
  withdrawalServiceGetWithdrawalList,
  withdrawalServiceRejectWithdrawal,
} from "@workspace/ui/services/admin/withdrawalService";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Display } from "@/components/display";
import { UserDetail } from "@/sections/user/user-detail";
import { formatDate } from "@/utils/common";

function toNumber(value: unknown) {
  const parsed =
    typeof value === "string" ? Number.parseFloat(value) : Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getField<T>(source: unknown, snakeKey: string, camelKey: string) {
  const record = (source || {}) as Record<string, T>;
  return record[snakeKey] ?? record[camelKey];
}

function normalizeMethod(value: unknown) {
  const method = String(value || "")
    .trim()
    .toLowerCase();
  return method === "ustd" ? "usdt" : method;
}

export default function WithdrawalPage() {
  const { t } = useTranslation("withdrawal");
  const ref = useRef<ProTableActions>(null);
  const [rejectRow, setRejectRow] = useState<WithdrawalRecord | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const statusMap: Record<number, { label: string; variant: any }> = {
    0: { label: t("status.pending", "Pending"), variant: "outline" },
    1: { label: t("status.approved", "Approved"), variant: "default" },
    2: {
      label: t("status.rejected", "Rejected"),
      variant: "destructive",
    },
  };

  async function approve(row: WithdrawalRecord) {
    const id = getField<string>(row, "id", "id");
    if (!id) return;
    await withdrawalServiceApproveWithdrawal({ id });
    toast.success(t("approveSuccess", "Withdrawal approved"));
    ref.current?.refresh();
  }

  async function reject() {
    const id = getField<string>(rejectRow, "id", "id");
    if (!id) return;
    if (!reason.trim()) {
      toast.error(t("reasonRequired", "Please enter a rejection reason"));
      return;
    }
    setLoading(true);
    try {
      await withdrawalServiceRejectWithdrawal({
        id,
        reason: reason.trim(),
      });
      toast.success(t("rejectSuccess", "Withdrawal rejected"));
      setRejectRow(null);
      setReason("");
      ref.current?.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ProTable<WithdrawalRecord, GetWithdrawalListParams>
        action={ref}
        actions={{
          render: (row) => {
            const status = toNumber(getField(row, "status", "status"));
            if (status !== 0) return [];
            return [
              <ConfirmButton
                cancelText={t("cancel", "Cancel")}
                confirmText={t("approve", "Approve")}
                description={t(
                  "approveDescription",
                  "Approving will mark this withdrawal request as completed."
                )}
                key="approve"
                onConfirm={() => approve(row)}
                title={t("approveTitle", "Approve this withdrawal?")}
                trigger={
                  <Button size="sm" variant="outline">
                    <CheckCircle2 className="size-4" />
                    {t("approve", "Approve")}
                  </Button>
                }
              />,
              <Button
                key="reject"
                onClick={() => {
                  setRejectRow(row);
                  setReason("");
                }}
                size="sm"
                variant="destructive"
              >
                <XCircle className="size-4" />
                {t("reject", "Reject")}
              </Button>,
            ];
          },
        }}
        columns={[
          {
            accessorKey: "userId",
            header: t("column.user", "User"),
            cell: ({ row }) => (
              <UserDetail
                id={Number(getField(row.original, "user_id", "userId"))}
              />
            ),
          },
          {
            accessorKey: "amount",
            header: t("column.amount", "Amount"),
            cell: ({ row }) => (
              <Display
                type="currency"
                value={getField(row.original, "amount", "amount")}
              />
            ),
          },
          {
            accessorKey: "method",
            header: t("column.method", "Method"),
            cell: ({ row }) => (
              <Badge className="uppercase" variant="outline">
                {normalizeMethod(getField(row.original, "method", "method")) ||
                  "-"}
              </Badge>
            ),
          },
          {
            accessorKey: "content",
            header: t("column.account", "Receiving Account"),
            cell: ({ row }) => (
              <span className="block max-w-[260px] break-all">
                {getField(row.original, "content", "content") || "-"}
              </span>
            ),
          },
          {
            accessorKey: "status",
            header: t("column.status", "Status"),
            cell: ({ row }) => {
              const status = toNumber(
                getField(row.original, "status", "status")
              );
              const config =
                statusMap[status] ||
                ({
                  label: t("status.unknown", "Unknown"),
                  variant: "secondary",
                } as const);
              return <Badge variant={config.variant}>{config.label}</Badge>;
            },
          },
          {
            accessorKey: "reason",
            header: t("column.reason", "Reason"),
            cell: ({ row }) =>
              getField(row.original, "reason", "reason") || "-",
          },
          {
            accessorKey: "createdAt",
            header: t("column.createdAt", "Created At"),
            cell: ({ row }) =>
              formatDate(
                getField<string | number>(
                  row.original,
                  "created_at",
                  "createdAt"
                )
              ),
          },
          {
            accessorKey: "processedAt",
            header: t("column.processedAt", "Processed At"),
            cell: ({ row }) => {
              const processedAt = getField(
                row.original,
                "processed_at",
                "processedAt"
              );
              return processedAt
                ? formatDate(processedAt as string | number)
                : "-";
            },
          },
        ]}
        header={{ title: t("title", "Withdrawal Management") }}
        params={[
          { key: "userId", placeholder: t("column.userId", "User ID") },
          {
            key: "status",
            placeholder: t("column.status", "Status"),
            options: [
              { label: t("status.pending", "Pending"), value: "0" },
              { label: t("status.approved", "Approved"), value: "1" },
              { label: t("status.rejected", "Rejected"), value: "2" },
            ],
          },
          {
            key: "method",
            placeholder: t("column.method", "Method"),
            options: [
              { label: "Alipay", value: "alipay" },
              { label: "WeChat", value: "wechat" },
              { label: "USDT", value: "usdt" },
            ],
          },
        ]}
        request={async (pagination, filter) => {
          const { data } = await withdrawalServiceGetWithdrawalList({
            ...filter,
            page: String(pagination.page),
            size: String(pagination.size),
            status:
              filter.status === undefined || String(filter.status) === ""
                ? undefined
                : Number(filter.status),
          });
          const list = data?.data?.list || [];
          return {
            list,
            total: Number(data?.data?.total || list.length),
          };
        }}
      />

      <Dialog
        onOpenChange={(open) => !open && setRejectRow(null)}
        open={!!rejectRow}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("rejectTitle", "Reject withdrawal")}</DialogTitle>
            <DialogDescription>
              {t(
                "rejectDescription",
                "Rejected requests will refund the amount back to the user's commission."
              )}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            onChange={(event) => setReason(event.target.value)}
            placeholder={t("reasonPlaceholder", "Enter rejection reason")}
            value={reason}
          />
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={() => setRejectRow(null)}
              variant="outline"
            >
              {t("cancel", "Cancel")}
            </Button>
            <Button disabled={loading} onClick={reject} variant="destructive">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {t("reject", "Reject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
