import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Switch } from "@workspace/ui/components/switch";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import { unitConversion } from "@workspace/ui/utils/unit-conversions";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const toNumber = (value: unknown): number | undefined => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = typeof value === "string" ? Number(value) : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

// normalize：把后端返回的字段（毫秒时间戳、cents 金额）转成表单展示值
// 表单内：金额用「元」（dollars），时间用「毫秒」（直接透传，DatePicker 处理）
function normalizeValues<T extends Record<string, any>>(values?: T) {
  if (!values) return undefined;
  return {
    ...values,
    tiers: Array.isArray(values.tiers)
      ? values.tiers.map((tier: any) => ({
          amount:
            unitConversion("centsToDollars", toNumber(tier.amount ?? tier.Amount)) ?? 0,
          bonus:
            unitConversion("centsToDollars", toNumber(tier.bonus ?? tier.Bonus)) ?? 0,
          label: tier.label ?? tier.Label ?? "",
          sort: toNumber(tier.sort ?? tier.Sort) ?? 0,
          enable: tier.enable ?? tier.Enable ?? true,
        }))
      : [],
  };
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  startTime: z.number().optional(),
  endTime: z.number().optional(),
  priority: z.number().optional(),
  stackMode: z.number().optional(),
  customBonusEnabled: z.boolean().optional(),
  customBonusPercent: z.number().optional(),
  sort: z.number().optional(),
  tiers: z
    .array(
      z.object({
        amount: z.number(),
        bonus: z.number(),
        label: z.string(),
        sort: z.number(),
        enable: z.boolean(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PromotionFormProps {
  onSubmit: (data: API.CreateRechargePromotionRequest) => Promise<boolean> | boolean;
  initialValues?: API.RechargePromotion;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function PromotionForm({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: PromotionFormProps) {
  const { t } = useTranslation("rechargePromotion");
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: 0,
      stackMode: 0,
      customBonusEnabled: false,
      customBonusPercent: 0,
      sort: 0,
      tiers: [],
      ...normalizeValues(initialValues ?? ({} as any)),
    } as any,
  });

  useEffect(() => {
    form?.reset({
      priority: 0,
      stackMode: 0,
      customBonusEnabled: false,
      customBonusPercent: 0,
      sort: 0,
      tiers: [],
      ...normalizeValues(initialValues ?? ({} as any)),
    } as any);
  }, [form, initialValues]);

  async function handleSubmit(data: FormValues) {
    // 转换：表单「元」→ 后端「分」（cents）
    const payload: API.CreateRechargePromotionRequest = {
      name: data.name ?? "",
      description: data.description ?? "",
      startTime: data.startTime ?? 0,
      endTime: data.endTime ?? 0,
      priority: data.priority ?? 0,
      stackMode: data.stackMode ?? 0,
      customBonusEnabled: data.customBonusEnabled ?? false,
      customBonusPercent: data.customBonusPercent ?? 0,
      sort: data.sort ?? 0,
      tiers: (data.tiers ?? []).map((tier) => ({
        amount: unitConversion("dollarsToCents", tier.amount),
        bonus: unitConversion("dollarsToCents", tier.bonus),
        label: tier.label ?? "",
        sort: tier.sort ?? 0,
        enable: tier.enable ?? true,
      })),
    };
    const ok = await onSubmit(payload);
    if (ok) setOpen(false);
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            form.reset({
              priority: 0,
              stackMode: 0,
              customBonusEnabled: false,
              customBonusPercent: 0,
              sort: 0,
              tiers: [],
            } as any);
            setOpen(true);
          }}
        >
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] max-w-full md:max-w-screen-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-48px-36px-36px-env(safe-area-inset-top))]">
          <Form {...form}>
            <form
              className="space-y-4 px-6 pt-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* 活动名称 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.name")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        onValueChange={(value) =>
                          form.setValue(field.name, String(value ?? ""))
                        }
                        placeholder={t("form.namePlaceholder")}
                        value={String(field.value ?? "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 描述 */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.description")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        onValueChange={(value) =>
                          form.setValue(field.name, String(value ?? ""))
                        }
                        placeholder={t("form.descriptionPlaceholder")}
                        value={String(field.value ?? "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 优先级 + 排序 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.priority")}</FormLabel>
                      <FormControl>
                        <EnhancedInput
                          type="number"
                          onValueChange={(value) =>
                            form.setValue(field.name, toNumber(value) ?? 0)
                          }
                          value={toNumber(field.value) ?? 0}
                        />
                      </FormControl>
                      <FormDescription>{t("form.priorityHint")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.sort")}</FormLabel>
                      <FormControl>
                        <EnhancedInput
                          type="number"
                          onValueChange={(value) =>
                            form.setValue(field.name, toNumber(value) ?? 0)
                          }
                          value={toNumber(field.value) ?? 0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* 叠加策略 */}
              <FormField
                control={form.control}
                name="stackMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.stackMode")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={toNumber(field.value) === 1}
                          onCheckedChange={(checked) =>
                            form.setValue(field.name, checked ? 1 : 0)
                          }
                        />
                        <span className="text-sm">
                          {toNumber(field.value) === 1
                            ? t("stackable")
                            : t("exclusive")}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 自定义金额赠送 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customBonusEnabled"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.customBonus")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 pt-2">
                          <Switch
                            checked={!!field.value}
                            onCheckedChange={(checked) =>
                              form.setValue(field.name, checked)
                            }
                          />
                          <span className="text-sm">
                            {field.value ? t("confirm") : t("cancel")}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customBonusPercent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.customBonusPercent")}</FormLabel>
                      <FormControl>
                        <EnhancedInput
                          type="number"
                          max={10000}
                          min={0}
                          suffix="‱"
                          disabled={!form.watch("customBonusEnabled")}
                          onValueChange={(value) =>
                            form.setValue(field.name, toNumber(value) ?? 0)
                          }
                          value={toNumber(field.value) ?? 0}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("form.customBonusPercentHint")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* 档位编辑器（TierEditor） */}
              <FormField
                control={form.control}
                name="tiers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.tiers")}</FormLabel>
                    <FormControl>
                      <TierEditor
                        value={field.value ?? []}
                        onChange={(tiers) =>
                          form.setValue(field.name, tiers, { shouldDirty: true })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className="flex-row justify-end gap-2 pt-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("form.cancel")}
          </Button>
          <Button disabled={loading} onClick={form.handleSubmit(handleSubmit)}>
            {loading && <LoaderCircle className="mr-2 animate-spin" />}
            {t("form.confirm")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ============================================================================
// TierEditor - 充值档位编辑器（受控组件，可手动增删行）
// ============================================================================

interface TierRow {
  amount: number;
  bonus: number;
  label: string;
  sort: number;
  enable: boolean;
}

function TierEditor({
  value,
  onChange,
}: {
  value: TierRow[];
  onChange: (value: TierRow[]) => void;
}) {
  const { t } = useTranslation("rechargePromotion");

  const updateRow = (idx: number, patch: Partial<TierRow>) => {
    const next = value.map((row, i) => (i === idx ? { ...row, ...patch } : row));
    onChange(next);
  };

  const addRow = () => {
    const nextSort = value.length;
    onChange([
      ...value,
      { amount: 0, bonus: 0, label: "", sort: nextSort, enable: true },
    ]);
  };

  const removeRow = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="grid gap-2">
      {value.map((row, idx) => (
        <div
          key={`tier-${idx}`}
          className="grid grid-cols-1 gap-2 rounded-md border p-2 md:grid-cols-[1fr_1fr_1fr_auto_auto]"
        >
          <EnhancedInput
            type="number"
            placeholder={t("form.tierAmountPlaceholder")}
            onValueBlur={(val) =>
              updateRow(idx, { amount: toNumber(val) ?? 0 })
            }
            value={row.amount}
          />
          <EnhancedInput
            type="number"
            placeholder={t("form.tierBonusPlaceholder")}
            onValueBlur={(val) => updateRow(idx, { bonus: toNumber(val) ?? 0 })}
            value={row.bonus}
          />
          <EnhancedInput
            placeholder={t("form.tierLabelPlaceholder")}
            onValueChange={(val) =>
              updateRow(idx, { label: String(val ?? "") })
            }
            value={row.label}
          />
          <div className="flex items-center gap-1.5">
            <Switch
              checked={row.enable}
              onCheckedChange={(checked) => updateRow(idx, { enable: checked })}
            />
          </div>
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => removeRow(idx)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addRow}>
        <Plus className="mr-1 h-4 w-4" />
        {t("form.addTier")}
      </Button>
    </div>
  );
}
