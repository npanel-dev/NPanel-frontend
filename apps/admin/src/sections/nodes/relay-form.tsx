"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Label } from "@workspace/ui/components/label";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Combobox } from "@workspace/ui/composed/combobox";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import TagInput from "@workspace/ui/composed/tag-input";
import {
  getGroupConfig,
  getNodeGroupList,
} from "@workspace/ui/services/admin/group";
import { createRelayEntry } from "@workspace/ui/services/admin/server";
import type { TFunction } from "i18next";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { useNode } from "@/stores/node";

const buildSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, t("errors.nameRequired", "Please enter a name")),
    address: z
      .string()
      .trim()
      .min(
        1,
        t("errors.relayAddrRequired", "Please enter the relay provider address")
      ),
    port: z
      .number({
        message: t("errors.portRange", "Port must be between 1 and 65535"),
      })
      .int()
      .min(1, t("errors.portRange", "Port must be between 1 and 65535"))
      .max(65_535, t("errors.portRange", "Port must be between 1 and 65535")),
    source_node_id: z.string().min(1, {
      message: t("errors.sourceNodeRequired", "Please select a landing node"),
    }),
    service_port: z
      .number({
        message: t("errors.portRange", "Port must be between 1 and 65535"),
      })
      .int()
      .min(1, t("errors.portRange", "Port must be between 1 and 65535"))
      .max(65_535, t("errors.portRange", "Port must be between 1 and 65535")),
    ratio: z
      .number({
        message: t("errors.ratioRequired", "Ratio must be greater than 0"),
      })
      .min(0.01, t("errors.ratioRequired", "Ratio must be greater than 0")),
    tags: z.array(z.string()),
    node_group_ids: z.optional(z.array(z.string()).default([])),
  });

export type RelayFormValues = z.infer<ReturnType<typeof buildSchema>>;

export default function RelayForm(props: {
  trigger: string;
  title?: string;
  initialSourceNodeId?: string | number;
  onCreated?: () => void;
}) {
  const { trigger, title, initialSourceNodeId, onCreated } = props;
  const { t } = useTranslation("nodes");
  const Scheme = useMemo(() => buildSchema(t), [t]);
  const [open, setOpen] = useState(false);
  const formId = useId();

  const { nodes, tags, fetchNodes, fetchTags } = useNode();

  const form = useForm({
    resolver: zodResolver(Scheme),
    defaultValues: {
      name: "",
      address: "",
      port: 443,
      source_node_id: initialSourceNodeId ? String(initialSourceNodeId) : "",
      service_port: 0,
      ratio: 1,
      tags: [],
      node_group_ids: [],
    } as RelayFormValues,
    mode: "onSubmit",
  });

  const landingNodeOptions = useMemo(
    () =>
      (nodes || [])
        .filter(
          (node) =>
            (node.node_type || "landing") !== "front" &&
            node.enabled !== false &&
            !node.is_hidden
        )
        .map((node) => ({
          value: String(node.id),
          label: `${node.name || node.address || node.id} (${node.protocol || "—"}:${node.port || "—"} / ${node.address || "—"})`,
        })),
    [nodes]
  );

  // Fetch node groups
  const { data: nodeGroupsData } = useQuery({
    queryKey: ["nodeGroups"],
    queryFn: async () => {
      const { data } = await getNodeGroupList({ page: 1, size: 1000 });
      return data.data?.list || [];
    },
  });

  const { data: groupConfigData } = useQuery({
    queryKey: ["groupConfig"],
    queryFn: async () => {
      const { data } = await getGroupConfig();
      return data.data;
    },
  });

  const isGroupEnabled = groupConfigData?.enabled;

  function handleSourceNodeChange(nextId?: string | null) {
    form.setValue("source_node_id", nextId || "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    const source = (nodes || []).find((n) => String(n.id) === String(nextId));
    if (source?.port) {
      // 预填源落地节点的实例端口作为服务端口（中转商转发目标），可按需修改
      form.setValue("service_port", Number(source.port), {
        shouldDirty: false,
      });
    }
  }

  async function handleSubmit(values: RelayFormValues) {
    try {
      await createRelayEntry({
        name: values.name,
        address: values.address,
        port: Number(values.port),
        source_node_id: Number(values.source_node_id),
        service_port: Number(values.service_port),
        ratio: Number(values.ratio),
        tags: values.tags || [],
        node_group_ids: (values.node_group_ids || []).map((id) => Number(id)),
      });
      toast.success(t("relay.created", "Relay entry created"));
      setOpen(false);
      form.reset();
      fetchNodes();
      fetchTags();
      onCreated?.();
      return true;
    } catch {
      return false;
    }
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
          }}
          variant="outline"
        >
          {trigger}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[560px] max-w-full">
        <SheetHeader>
          <SheetTitle>
            {title || t("relay.title", "Create Relay Entry")}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-48px-36px-36px-env(safe-area-inset-top))] px-6 pt-4">
          <Form {...form}>
            <form
              className="grid grid-cols-1 gap-4"
              id={formId}
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormDescription>
                {t(
                  "relay.description",
                  "Create a relay entry: users connect to the relay provider (address + connect port), traffic is forwarded to the landing VPS (service port) and billed at the specified ratio. A dedicated protocol instance is created automatically."
                )}
              </FormDescription>
              <FormField
                control={form.control}
                name="source_node_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("relay.source_node", "Source Landing Node")}
                    </FormLabel>
                    <FormControl>
                      <Combobox<string, false>
                        onChange={(v) => handleSourceNodeChange(v)}
                        options={landingNodeOptions}
                        placeholder={t(
                          "relay.select_source_node",
                          "Select landing node…"
                        )}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      {t(
                        "relay.source_node_description",
                        "The protocol configuration is copied from this landing node."
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name", "Name")}</FormLabel>
                    <FormControl>
                      <EnhancedInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("relay.relay_address", "Relay Address")}
                      </FormLabel>
                      <FormControl>
                        <EnhancedInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("relay.connect_port", "Connect Port")}
                      </FormLabel>
                      <FormControl>
                        <EnhancedInput
                          {...field}
                          max={65_535}
                          min={1}
                          placeholder="1-65535"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription>
                        {t(
                          "relay.connect_port_description",
                          "The port users connect to."
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="service_port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("relay.service_port", "Service Port")}
                      </FormLabel>
                      <FormControl>
                        <EnhancedInput
                          {...field}
                          max={65_535}
                          min={1}
                          placeholder="1-65535"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription>
                        {t(
                          "relay.service_port_description",
                          "The port the relay forwards to on the landing VPS."
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ratio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("relay.ratio", "Ratio")}</FormLabel>
                      <FormControl>
                        <EnhancedInput
                          {...field}
                          min={0.01}
                          step={0.01}
                          suffix="x"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription>
                        {t(
                          "relay.ratio_description",
                          "Traffic on this entry is billed at this ratio."
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tags", "Tags")}</FormLabel>
                    <FormControl>
                      <TagInput
                        onChange={(v) => form.setValue(field.name, v)}
                        options={tags || []}
                        placeholder={t(
                          "tags_placeholder",
                          "Use Enter or comma (,) to add multiple tags"
                        )}
                        value={field.value || []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isGroupEnabled && (
                <FormField
                  control={form.control}
                  name="node_group_ids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("nodeGroup", "Node Group")}</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-2">
                          {nodeGroupsData?.map((g) => (
                            <div
                              className="flex items-center space-x-2"
                              key={g.id}
                            >
                              <Checkbox
                                checked={field.value?.includes(String(g.id))}
                                id={`relay-node-group-${g.id}`}
                                onCheckedChange={(checked) => {
                                  const currentValue = Array.isArray(
                                    field.value
                                  )
                                    ? field.value
                                    : [];
                                  if (checked) {
                                    form.setValue(
                                      field.name,
                                      [...currentValue, String(g.id)],
                                      {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      }
                                    );
                                    return;
                                  }
                                  form.setValue(
                                    field.name,
                                    currentValue.filter(
                                      (v: string) => v !== String(g.id)
                                    ),
                                    {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                    }
                                  );
                                }}
                              />
                              <Label
                                className="cursor-pointer"
                                htmlFor={`relay-node-group-${g.id}`}
                              >
                                {g.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </form>
          </Form>
        </ScrollArea>

        <SheetFooter className="flex-row justify-end gap-2 pt-3">
          <Button onClick={() => setOpen(false)} variant="outline">
            {t("cancel", "Cancel")}
          </Button>
          <Button form={formId} type="submit">
            {t("confirm", "Confirm")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
