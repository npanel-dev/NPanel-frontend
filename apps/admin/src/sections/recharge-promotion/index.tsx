import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Switch } from "@workspace/ui/components/switch";
import { ConfirmButton } from "@workspace/ui/composed/confirm-button";
import {
  ProTable,
  type ProTableActions,
} from "@workspace/ui/composed/pro-table/pro-table";
import {
  createRechargePromotion,
  deleteRechargePromotion,
  getRechargePromotionList,
  updateRechargePromotion,
  updateRechargePromotionStatus,
} from "@workspace/ui/services/admin/promotion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Display } from "@/components/display";
import { formatDate } from "@/utils/common";
import PromotionForm from "./promotion-form";

const toNumber = (value: unknown): number => {
  if (value === "" || value === null || value === undefined) return 0;
  const parsed = typeof value === "string" ? Number(value) : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function RechargePromotion() {
  const { t } = useTranslation("rechargePromotion");
  const [loading, setLoading] = useState(false);
  const ref = useRef<ProTableActions>(null);

  return (
    <ProTable<API.RechargePromotion, { status: string; search: string }>
      action={ref}
      actions={{
        render: (row) => [
          <PromotionForm
            initialValues={row}
            key="edit"
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await updateRechargePromotion({ ...values, id: row.id ?? 0 });
                toast.success(t("updateSuccess", "Update Success"));
                ref.current?.refresh();
                setLoading(false);
                return true;
              } catch (_error) {
                setLoading(false);
                return false;
              }
            }}
            title={t("editPromotion", "Edit Promotion")}
            trigger={t("edit", "Edit")}
          />,
          <ConfirmButton
            cancelText={t("cancel", "Cancel")}
            confirmText={t("confirm", "Confirm")}
            description={t(
              "deleteWarning",
              "Once deleted, data cannot be recovered. Please proceed with caution."
            )}
            key="delete"
            onConfirm={async () => {
              await deleteRechargePromotion({ id: row.id ?? 0 });
              toast.success(t("deleteSuccess", "Delete Success"));
              ref.current?.refresh();
            }}
            title={t("confirmDelete", "Are you sure you want to delete?")}
            trigger={
              <Button variant="destructive">{t("delete", "Delete")}</Button>
            }
          />,
        ],
      }}
      columns={[
        {
          accessorKey: "name",
          header: t("name", "Name"),
        },
        {
          accessorKey: "status",
          header: t("status", "Status"),
          cell: ({ row }) => (
            <Switch
              defaultChecked={!!row.getValue("status")}
              onCheckedChange={async (checked) => {
                await updateRechargePromotionStatus({
                  id: row.original.id ?? 0,
                  status: checked,
                });
                toast.success(t("updateSuccess", "Update Success"));
                ref.current?.refresh();
              }}
            />
          ),
        },
        {
          accessorKey: "priority",
          header: t("priority", "Priority"),
          cell: ({ row }) => toNumber(row.getValue("priority")),
        },
        {
          accessorKey: "stackMode",
          header: t("stackMode", "Stack Mode"),
          cell: ({ row }) => {
            const mode = toNumber(row.getValue("stackMode"));
            return (
              <Badge variant={mode === 0 ? "secondary" : "default"}>
                {mode === 0
                  ? t("exclusive", "Exclusive")
                  : t("stackable", "Stackable")}
              </Badge>
            );
          },
        },
        {
          accessorKey: "tiers",
          header: t("tiers", "Tiers"),
          cell: ({ row }) => {
            const tiers = row.original.tiers ?? [];
            if (tiers.length === 0) {
              return toNumber(row.original.customBonusEnabled) ? (
                <span className="text-muted-foreground text-xs">
                  {t("customOnly", "Custom amount only")}{" "}
                  {toNumber(row.original.customBonusPercent) / 100}%
                </span>
              ) : (
                "--"
              );
            }
            return (
              <div className="flex flex-wrap gap-1">
                {tiers
                  .slice()
                  .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
                  .map((tier, idx) => (
                    <Badge key={`tier-${idx}`} variant="outline">
                      <Display type="currency" value={toNumber(tier.amount)} />
                      {toNumber(tier.bonus) > 0 && (
                        <span className="ml-1 text-green-600">
                          +<Display type="currency" value={toNumber(tier.bonus)} />
                        </span>
                      )}
                    </Badge>
                  ))}
              </div>
            );
          },
        },
        {
          accessorKey: "start_time",
          header: t("validityPeriod", "Validity Period"),
          cell: ({ row }) => {
            const start = toNumber(row.original.startTime);
            const end = toNumber(row.original.endTime);
            if (!start && !end) return t("longTerm", "Long-term");
            return (
              <div className="flex flex-col text-xs">
                <span>{start ? formatDate(start) : "--"}</span>
                <span className="text-muted-foreground">
                  {end ? formatDate(end) : t("longTerm", "Long-term")}
                </span>
              </div>
            );
          },
        },
      ]}
      header={{
        toolbar: (
          <PromotionForm
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await createRechargePromotion(values);
                toast.success(t("createSuccess", "Create Success"));
                ref.current?.refresh();
                setLoading(false);
                return true;
              } catch (_error) {
                setLoading(false);
                return false;
              }
            }}
            title={t("createPromotion", "Create Promotion")}
            trigger={t("create", "Create")}
          />
        ),
      }}
      params={[
        {
          key: "search",
        },
      ]}
      request={async (pagination, filters) => {
        const searchValue =
          typeof filters?.search === "string" ? filters.search : undefined;
        const { data } = await getRechargePromotionList({
          page: pagination.page,
          size: pagination.size,
          search: searchValue,
        });
        return {
          list: data.data?.list || [],
          total: data.data?.total || 0,
        };
      }}
    />
  );
}
