import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
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
import { Icon } from "@workspace/ui/composed/icon";
import {
  getInviteConfig,
  updateInviteConfig,
} from "@workspace/ui/services/admin/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

function toNumber(value: unknown): number | undefined {
  if (value === "" || value === null || value === undefined) return;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

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
        .filter((item) => item.method);
      return methods.length ? methods : DEFAULT_WITHDRAWAL_METHODS;
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

function isMethodEnabled(methods: WithdrawalMethod[], method: string) {
  return methods.find((item) => item.method === method)?.enabled !== false;
}

function getConfigValue<T>(
  source: unknown,
  snakeKey: string,
  camelKey: string
) {
  const record = (source || {}) as Record<string, T>;
  return record[snakeKey] ?? record[camelKey];
}

const inviteSchema = z.object({
  forced_invite: z.boolean().optional(),
  referral_percentage: z.number().optional(),
  only_first_purchase: z.boolean().optional(),
  withdrawal_min_amount: z.number().optional(),
  alipay_enabled: z.boolean().optional(),
  wechat_enabled: z.boolean().optional(),
  usdt_enabled: z.boolean().optional(),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export default function InviteConfig() {
  const { t } = useTranslation("system");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["getInviteConfig"],
    queryFn: async () => {
      const { data } = await getInviteConfig();
      return data.data;
    },
    enabled: open,
  });

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      forced_invite: false,
      referral_percentage: 0,
      only_first_purchase: false,
      withdrawal_min_amount: 0,
      alipay_enabled: true,
      wechat_enabled: true,
      usdt_enabled: true,
    },
  });

  useEffect(() => {
    if (data) {
      const methods = parseWithdrawalMethods(
        getConfigValue<string>(data, "withdrawal_methods", "withdrawalMethods")
      );
      form.reset({
        forced_invite: getConfigValue<boolean>(
          data,
          "forced_invite",
          "forcedInvite"
        ),
        referral_percentage: toNumber(
          getConfigValue(data, "referral_percentage", "referralPercentage")
        ),
        only_first_purchase: getConfigValue<boolean>(
          data,
          "only_first_purchase",
          "onlyFirstPurchase"
        ),
        withdrawal_min_amount:
          toNumber(
            getConfigValue(data, "withdrawal_min_amount", "withdrawalMinAmount")
          ) || 0,
        alipay_enabled: isMethodEnabled(methods, "alipay"),
        usdt_enabled: isMethodEnabled(methods, "usdt"),
        wechat_enabled: isMethodEnabled(methods, "wechat"),
      });
    }
  }, [data, form]);

  async function onSubmit(values: InviteFormData) {
    setLoading(true);
    try {
      const withdrawalMethods: WithdrawalMethod[] = [
        {
          method: "alipay",
          label: t("invite.methodAlipay", "Alipay"),
          enabled: values.alipay_enabled,
        },
        {
          method: "wechat",
          label: t("invite.methodWechat", "WeChat"),
          enabled: values.wechat_enabled,
        },
        {
          method: "usdt",
          label: t("invite.methodUsdt", "USDT"),
          enabled: values.usdt_enabled,
        },
      ];
      await updateInviteConfig({
        forced_invite: values.forced_invite,
        referral_percentage: values.referral_percentage,
        only_first_purchase: values.only_first_purchase,
        withdrawal_min_amount: values.withdrawal_min_amount || 0,
        withdrawal_methods: JSON.stringify(withdrawalMethods),
      } as API.InviteConfig);
      toast.success(t("invite.saveSuccess", "Save Successful"));
      refetch();
      setOpen(false);
    } catch (_error) {
      toast.error(t("invite.saveFailed", "Save Failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon
                className="h-5 w-5 text-primary"
                icon="mdi:account-multiple-plus-outline"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {t("invite.title", "Invitation Settings")}
              </p>
              <p className="text-muted-foreground text-sm">
                {t(
                  "invite.description",
                  "Configure user invitation and referral reward settings"
                )}
              </p>
            </div>
          </div>
          <Icon className="size-6" icon="mdi:chevron-right" />
        </div>
      </SheetTrigger>
      <SheetContent className="w-[600px] max-w-full md:max-w-screen-md">
        <SheetHeader>
          <SheetTitle>{t("invite.title", "Invitation Settings")}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-48px-36px-36px-24px-env(safe-area-inset-top))] px-6">
          <Form {...form}>
            <form
              className="space-y-2 pt-4"
              id="invite-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="forced_invite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(
                        "invite.forcedInvite",
                        "Require Invitation to Register"
                      )}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        className="!mt-0 float-end"
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "invite.forcedInviteDescription",
                        "When enabled, users must register through an invitation link"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referral_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(
                        "invite.referralPercentage",
                        "Referral Reward Percentage"
                      )}
                    </FormLabel>
                    <FormControl>
                      <EnhancedInput
                        max={100}
                        min={0}
                        onValueBlur={(value) => field.onChange(Number(value))}
                        placeholder={t(
                          "invite.inputPlaceholder",
                          "Please enter"
                        )}
                        suffix="%"
                        type="number"
                        value={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "invite.referralPercentageDescription",
                        "Percentage of reward given to referrers"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="only_first_purchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(
                        "invite.onlyFirstPurchase",
                        "First Purchase Reward Only"
                      )}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        className="!mt-0 float-end"
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "invite.onlyFirstPurchaseDescription",
                        "When enabled, referrers only receive rewards for the first purchase by referred users"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="withdrawal_min_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("invite.withdrawalMinAmount", "Minimum Withdrawal")}
                    </FormLabel>
                    <FormControl>
                      <EnhancedInput
                        min={0}
                        onValueBlur={(value) => field.onChange(Number(value))}
                        placeholder={t(
                          "invite.inputPlaceholder",
                          "Please enter"
                        )}
                        type="number"
                        value={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "invite.withdrawalMinAmountDescription",
                        "Users can submit withdrawal requests only when the amount reaches this threshold"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3 rounded-lg border p-4">
                <div>
                  <p className="font-medium text-sm">
                    {t("invite.withdrawalMethods", "Withdrawal Methods")}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t(
                      "invite.withdrawalMethodsDescription",
                      "Enabled methods will be available on the user wallet withdrawal form"
                    )}
                  </p>
                </div>
                {[
                  {
                    name: "alipay_enabled" as const,
                    title: t("invite.methodAlipay", "Alipay"),
                  },
                  {
                    name: "wechat_enabled" as const,
                    title: t("invite.methodWechat", "WeChat"),
                  },
                  {
                    name: "usdt_enabled" as const,
                    title: t("invite.methodUsdt", "USDT"),
                  },
                ].map((item) => (
                  <FormField
                    control={form.control}
                    key={item.name}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-3">
                        <FormLabel className="!mt-0">{item.title}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className="flex-row justify-end gap-2 pt-3">
          <Button
            disabled={loading}
            onClick={() => setOpen(false)}
            variant="outline"
          >
            {t("common.cancel", "Cancel")}
          </Button>
          <Button disabled={loading} form="invite-form" type="submit">
            {loading && (
              <Icon className="mr-2 animate-spin" icon="mdi:loading" />
            )}
            {t("common.save", "Save Settings")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
