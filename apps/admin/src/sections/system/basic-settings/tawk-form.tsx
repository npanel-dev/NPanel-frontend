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
  getTawkConfig,
  updateTawkConfig,
} from "@workspace/ui/services/admin/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

const tawkSchema = z.object({
  enabled: z.boolean().optional(),
  property_id: z.string().optional(),
  widget_id: z.string().optional(),
  identify_user: z.boolean().optional(),
  secure_mode: z.boolean().optional(),
  secret_key: z.string().optional(),
});

type TawkFormData = z.infer<typeof tawkSchema>;

export default function TawkForm() {
  const { t } = useTranslation("system");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["getTawkConfig"],
    queryFn: async () => {
      const { data } = await getTawkConfig();
      return data.data;
    },
    enabled: open,
  });

  const form = useForm<TawkFormData>({
    resolver: zodResolver(tawkSchema),
    defaultValues: {
      enabled: false,
      property_id: "",
      widget_id: "default",
      identify_user: true,
      secure_mode: false,
      secret_key: "",
    },
  });

  const secureMode = form.watch("secure_mode");

  useEffect(() => {
    if (data) {
      form.reset({
        enabled: data.enabled ?? false,
        property_id: data.property_id ?? "",
        widget_id: data.widget_id || "default",
        identify_user: data.identify_user ?? true,
        secure_mode: data.secure_mode ?? false,
        secret_key: data.secret_key ?? "",
      });
    }
  }, [data, form]);

  async function onSubmit(values: TawkFormData) {
    setLoading(true);
    try {
      await updateTawkConfig({
        ...values,
        property_id: values.property_id?.trim(),
        widget_id: values.widget_id?.trim() || "default",
        secret_key: values.secret_key?.trim(),
      } as API.UpdateTawkConfigRequest);
      toast.success(t("common.saveSuccess", "Save Successful"));
      refetch();
      setOpen(false);
    } catch (_error) {
      toast.error(t("common.saveFailed", "Save Failed"));
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
                icon="mdi:chat-processing"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {t("tawk.title", "Tawk Customer Service")}
              </p>
              <p className="text-muted-foreground text-sm">
                {t(
                  "tawk.description",
                  "Configure the tawk.to chat widget for the user portal"
                )}
              </p>
            </div>
          </div>
          <Icon className="size-6" icon="mdi:chevron-right" />
        </div>
      </SheetTrigger>
      <SheetContent className="w-[600px] max-w-full gap-0 md:max-w-screen-md">
        <SheetHeader>
          <SheetTitle>{t("tawk.title", "Tawk Customer Service")}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-48px-36px-36px-24px-env(safe-area-inset-top))] px-6">
          <Form {...form}>
            <form
              className="space-y-4 pt-4"
              id="tawk-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <FormLabel>
                        {t("tawk.enabled", "Enable Widget")}
                      </FormLabel>
                      <FormDescription>
                        {t(
                          "tawk.enabledDescription",
                          "Show the tawk.to chat widget on the user portal"
                        )}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tawk.propertyId", "Property ID")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        onValueChange={field.onChange}
                        placeholder="64f000000000000000000000"
                        value={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "tawk.propertyIdDescription",
                        "The first ID segment in the tawk.to embed URL"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="widget_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tawk.widgetId", "Widget ID")}</FormLabel>
                    <FormControl>
                      <EnhancedInput
                        onValueChange={field.onChange}
                        placeholder="default"
                        value={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "tawk.widgetIdDescription",
                        "The second ID segment in the tawk.to embed URL, usually default"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identify_user"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <FormLabel>
                        {t("tawk.identifyUser", "Identify Logged-in Users")}
                      </FormLabel>
                      <FormDescription>
                        {t(
                          "tawk.identifyUserDescription",
                          "Send the current user's basic identity to tawk.to after login"
                        )}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secure_mode"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <FormLabel>
                        {t("tawk.secureMode", "Secure Mode")}
                      </FormLabel>
                      <FormDescription>
                        {t(
                          "tawk.secureModeDescription",
                          "Use the backend secret to sign visitor identity"
                        )}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {secureMode && (
                <FormField
                  control={form.control}
                  name="secret_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("tawk.secretKey", "Secure Mode Secret Key")}
                      </FormLabel>
                      <FormControl>
                        <EnhancedInput
                          onValueChange={field.onChange}
                          placeholder={t(
                            "tawk.secretKeyPlaceholder",
                            "Paste the secret key from tawk.to"
                          )}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        {t(
                          "tawk.secretKeyDescription",
                          "Stored only on the backend and never returned in public config"
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
          <Button disabled={loading} form="tawk-form" type="submit">
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
