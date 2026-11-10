"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Switch } from "@workspace/ui/components/switch";
import { ConfirmButton } from "@workspace/ui/composed/confirm-button";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import {
  ProTable,
  type ProTableActions,
} from "@workspace/ui/composed/pro-table/pro-table";
import {
  getGroupConfig,
  getNodeGroupList,
} from "@workspace/ui/services/admin/group";
import {
  createNode,
  deleteNode,
  filterNodeList,
  resetSortWithNode,
  toggleNodeStatus,
  updateNode,
  updateNodeRatio,
} from "@workspace/ui/services/admin/server";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useNode } from "@/stores/node";
import { useServer } from "@/stores/server";
import NodeForm, { type NodeFormValues } from "./node-form";
import RelayForm from "./relay-form";

type NodeTableRow = API.Node & {
  _nodeListRole?: "landing" | "front_child" | "orphan_front";
  _frontNodeCount?: number;
  _targetLandingId?: string | number;
  _targetNode?: API.Node;
};

const ALL_NODES_PAGE_SIZE = 999_999_999;

function isFrontNode(node?: API.Node | NodeTableRow) {
  return (node?.node_type || "landing") === "front";
}

function buildGroupedNodeRows(
  nodes: API.Node[],
  expandedLandingIds: Set<string>
): NodeTableRow[] {
  const landingById = new Map<string, API.Node>();
  for (const node of nodes) {
    if (!isFrontNode(node)) {
      landingById.set(String(node.id), node);
    }
  }

  const frontsByLandingId = new Map<string, API.Node[]>();
  const groupedFrontIds = new Set<string>();
  for (const node of nodes) {
    if (!(isFrontNode(node) && node.target_node_id)) continue;
    const landingId = String(node.target_node_id);
    if (!landingById.has(landingId)) continue;
    const fronts = frontsByLandingId.get(landingId) || [];
    fronts.push(node);
    frontsByLandingId.set(landingId, fronts);
    groupedFrontIds.add(String(node.id));
  }

  const rows: NodeTableRow[] = [];
  for (const node of nodes) {
    if (!isFrontNode(node)) {
      const landingId = String(node.id);
      const fronts = frontsByLandingId.get(landingId) || [];
      rows.push({
        ...node,
        _nodeListRole: "landing",
        _frontNodeCount: fronts.length,
      });

      if (expandedLandingIds.has(landingId)) {
        rows.push(
          ...fronts.map((front) => ({
            ...front,
            _nodeListRole: "front_child" as const,
            _targetLandingId: node.id,
            _targetNode: node,
          }))
        );
      }
      continue;
    }

    if (!groupedFrontIds.has(String(node.id))) {
      rows.push({ ...node, _nodeListRole: "orphan_front" });
    }
  }
  return rows;
}

function toNodePayload(values: NodeFormValues, row?: API.Node) {
  const payload: Record<string, any> = {
    name: values.name,
    address: values.address,
    port: Number(values.port),
    tags: values.tags || [],
    node_type: values.node_type,
    is_hidden: values.is_hidden ?? false,
    node_group_ids: values.node_group_ids || [],
  };

  if (row?.id != null) {
    payload.id = row.id;
  }

  if (values.node_type === "front") {
    payload.target_node_id = values.target_node_id
      ? Number(values.target_node_id)
      : undefined;
    return payload;
  }

  payload.server_id = values.server_id ? Number(values.server_id) : undefined;
  payload.protocol = values.protocol;
  payload.target_node_id = undefined;
  return payload;
}

function toCopyPayload(row: API.Node) {
  const isFront = isFrontNode(row);
  return {
    name: row.name,
    address: row.address,
    port: Number(row.port),
    tags: row.tags || [],
    node_type: row.node_type || "landing",
    is_hidden: row.is_hidden ?? false,
    node_group_ids: row.node_group_ids || [],
    enabled: false,
    ...(isFront
      ? {
          target_node_id: row.target_node_id,
        }
      : {
          server_id: row.server_id,
          protocol: row.protocol,
          target_node_id: undefined,
        }),
  };
}

// RatioButton 修改链路倍率的小对话框（front 沿落地目标解析到协议实例）
function RatioButton({
  row,
  onDone,
}: {
  row: NodeTableRow;
  onDone: () => void;
}) {
  const { t } = useTranslation("nodes");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState<number>(
    Number(row.ratio) > 0 ? Number(row.ratio) : 1
  );

  async function handleConfirm() {
    if (!(ratio > 0)) {
      toast.error(
        t("relay.errors.ratioRequired", "Ratio must be greater than 0")
      );
      return;
    }
    setLoading(true);
    try {
      await updateNodeRatio({ node_id: row.id, ratio });
      toast.success(t("relay.updated", "Ratio updated"));
      setOpen(false);
      onDone();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        {t("relay.changeRatio", "Ratio")}
      </Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {t("relay.ratioDialogTitle", "Change link ratio")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <div className="text-muted-foreground text-sm">
              {row.name} · {row.address}:{row.port}
            </div>
            <EnhancedInput
              max={100}
              min={0.01}
              onValueChange={(v) => setRatio(Number(v))}
              step={0.01}
              suffix="x"
              type="number"
              value={ratio}
            />
            <div className="text-muted-foreground text-xs">
              {t(
                "relay.ratioDialogDescription",
                "Applies to the protocol instance of this link. Shared instances cannot be changed here."
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={() => setOpen(false)}
              variant="outline"
            >
              {t("cancel", "Cancel")}
            </Button>
            <Button disabled={loading} onClick={handleConfirm}>
              {t("confirm", "Confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Nodes() {
  const { t } = useTranslation("nodes");
  const ref = useRef<ProTableActions>(null);
  const [loading, setLoading] = useState(false);
  const [expandedLandingIds, setExpandedLandingIds] = useState<Set<string>>(
    () => new Set()
  );
  const didMountRef = useRef(false);

  // Use our zustand store for server data
  const { getServerName, getServerAddress } = useServer();
  const { fetchNodes, fetchTags, getNodeById } = useNode();

  // Fetch node groups for display
  const { data: nodeGroupsData } = useQuery({
    queryKey: ["nodeGroups"],
    queryFn: async () => {
      const { data } = await getNodeGroupList({ page: 1, size: 1000 });
      return data.data?.list || [];
    },
  });

  // Fetch group config to check if group feature is enabled
  const { data: groupConfigData } = useQuery({
    queryKey: ["groupConfig"],
    queryFn: async () => {
      const { data } = await getGroupConfig();
      return data.data;
    },
  });

  const isGroupEnabled = groupConfigData?.enabled;

  const getTargetNode = useCallback(
    (node: NodeTableRow) =>
      node._targetNode ||
      (node.target_node_id ? getNodeById(node.target_node_id) : undefined),
    [getNodeById]
  );

  const toggleLandingExpanded = useCallback((nodeId: string | number) => {
    setExpandedLandingIds((prev) => {
      const next = new Set(prev);
      const key = String(nodeId);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    ref.current?.refresh();
  }, [expandedLandingIds]);

  // Dynamic columns based on group feature status
  const columns = useMemo(() => {
    const baseColumns = [
      {
        id: "enabled",
        header: t("enabled", "Enabled"),
        cell: ({ row }: { row: any }) => (
          <Switch
            checked={row.original.enabled}
            onCheckedChange={async (v) => {
              await toggleNodeStatus({ id: row.original.id, enable: v });
              toast.success(
                v ? t("enabled_on", "Enabled") : t("enabled_off", "Disabled")
              );
              ref.current?.refresh();
              fetchNodes();
              fetchTags();
            }}
          />
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        header: t("name", "Name"),
        cell: ({ row }: { row: any }) => {
          const node = row.original as NodeTableRow;
          const frontCount = node._frontNodeCount || 0;
          const isExpanded = expandedLandingIds.has(String(node.id));
          const isChildFront = node._nodeListRole === "front_child";

          return (
            <div
              className={
                isChildFront
                  ? "flex min-w-48 items-center gap-2 pl-8"
                  : "flex min-w-48 items-center gap-2"
              }
            >
              {frontCount > 0 ? (
                <Button
                  aria-label={
                    isExpanded
                      ? t("collapse_front_nodes", "Collapse front nodes")
                      : t("expand_front_nodes", "Expand front nodes")
                  }
                  className="h-7 w-7 shrink-0"
                  onClick={() => toggleLandingExpanded(node.id)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              ) : (
                <span className="h-7 w-7 shrink-0" />
              )}
              <span className="truncate">{node.name || "—"}</span>
              {frontCount > 0 && (
                <Badge className="shrink-0" variant="secondary">
                  {t("front_node_count", "{{count}} front", {
                    count: frontCount,
                  })}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        id: "node_type",
        header: t("node_type", "Node Type"),
        cell: ({ row }: { row: any }) => {
          const node = row.original as NodeTableRow;
          const nodeType = node.node_type || "landing";
          return (
            <Badge variant={nodeType === "front" ? "secondary" : "outline"}>
              {nodeType === "front"
                ? t("node_type_front", "Frontend Node")
                : t("node_type_landing", "Landing Node")}
            </Badge>
          );
        },
      },
      {
        id: "target_node",
        header: t("target_node", "Landing Node"),
        cell: ({ row }: { row: any }) => {
          const node = row.original as NodeTableRow;
          const nodeType = node.node_type || "landing";
          if (nodeType !== "front") return "—";
          const target = getTargetNode(node);
          return target
            ? `${target.name || target.id} (${target.address || "—"}:${target.port || "—"})`
            : node.target_node_id || "—";
        },
      },
      {
        id: "address_port",
        header: `${t("address", "Address")}:${t("port", "Port")}`,
        cell: ({ row }: { row: any }) =>
          `${row.original.address || "—"}:${row.original.port || "—"}`,
      },
      {
        id: "server_id",
        header: t("server", "Server"),
        cell: ({ row }: { row: any }) => {
          const target = getTargetNode(row.original as NodeTableRow);
          const serverID = target?.server_id || row.original.server_id;
          return `${getServerName(serverID)}:${getServerAddress(serverID)}`;
        },
      },
      {
        id: "protocol",
        header: ` ${t("protocol", "Protocol")}:${t("port", "Port")}`,
        cell: ({ row }: { row: any }) => {
          const target = getTargetNode(row.original as NodeTableRow);
          const protocol = target?.protocol || row.original.protocol || "—";
          const port = target?.port || row.original.port || "—";
          return `${protocol}:${port}`;
        },
      },
      {
        id: "ratio",
        header: t("relay.ratio", "Ratio"),
        cell: ({ row }: { row: any }) => {
          const ratio = Number(row.original.ratio);
          const value = ratio > 0 ? ratio : 1;
          return (
            <Badge variant={value === 1 ? "outline" : "secondary"}>
              {value.toFixed(2)}x
            </Badge>
          );
        },
      },
      {
        id: "tags",
        header: t("tags", "Tags"),
        cell: ({ row }: { row: any }) => (
          <div className="flex flex-wrap gap-1">
            {(row.original.tags || []).length === 0
              ? "—"
              : row.original.tags.map((tg: string) => (
                  <Badge key={tg} variant="outline">
                    {tg}
                  </Badge>
                ))}
          </div>
        ),
      },
    ];

    // Add Node Groups column when group feature is enabled
    if (isGroupEnabled) {
      baseColumns.push({
        id: "node_group_ids",
        header: t("nodeGroups", "Node Groups"),
        cell: ({ row }: { row: any }) => {
          const groupIds = (row.original.node_group_ids as string[]) || [];

          // Public node indicator (when node_group_ids is empty)
          if (groupIds.length === 0) {
            return (
              <div className="flex items-center gap-2">
                <Badge className="text-xs" variant="secondary">
                  {t("public", "Public")}
                </Badge>
              </div>
            );
          }

          return (
            <div className="flex flex-wrap gap-1">
              {groupIds.map((groupId) => {
                const group = nodeGroupsData?.find(
                  (g) => String(g.id) === String(groupId)
                );
                return (
                  <Badge key={groupId} variant="outline">
                    {group?.name || String(groupId)}
                  </Badge>
                );
              })}
            </div>
          );
        },
      });
    }

    return baseColumns;
  }, [
    isGroupEnabled,
    nodeGroupsData,
    t,
    getServerName,
    getServerAddress,
    getTargetNode,
    expandedLandingIds,
    toggleLandingExpanded,
  ]);

  return (
    <ProTable<NodeTableRow, { search: string; node_group_id?: string }>
      action={ref}
      actions={{
        render: (row) => [
          <NodeForm
            initialValues={row as any}
            key="edit"
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                const body = toNodePayload(
                  values,
                  row
                ) as API.UpdateNodeRequest;
                await updateNode(body);
                toast.success(t("updated", "Updated"));
                ref.current?.refresh();
                fetchNodes();
                fetchTags();
                setLoading(false);
                return true;
              } catch {
                setLoading(false);
                return false;
              }
            }}
            title={t("drawerEditTitle", "Edit Node")}
            trigger={t("edit", "Edit")}
          />,
          <ConfirmButton
            cancelText={t("cancel", "Cancel")}
            confirmText={t("confirm", "Confirm")}
            description={t(
              "confirmDeleteDesc",
              "This action cannot be undone."
            )}
            key="delete"
            onConfirm={async () => {
              await deleteNode({ id: row.id } as any);
              toast.success(t("deleted", "Deleted"));
              ref.current?.refresh();
              fetchNodes();
              fetchTags();
            }}
            title={t("confirmDeleteTitle", "Delete this node?")}
            trigger={
              <Button variant="destructive">{t("delete", "Delete")}</Button>
            }
          />,
          <Button
            key="copy"
            onClick={async () => {
              await createNode(toCopyPayload(row));
              toast.success(t("copied", "Copied"));
              ref.current?.refresh();
              fetchNodes();
              fetchTags();
            }}
            variant="outline"
          >
            {t("copy", "Copy")}
          </Button>,
          <RatioButton
            key="ratio"
            onDone={() => {
              ref.current?.refresh();
              fetchNodes();
            }}
            row={row as NodeTableRow}
          />,
        ],
        batchRender(rows) {
          return [
            <ConfirmButton
              cancelText={t("cancel", "Cancel")}
              confirmText={t("confirm", "Confirm")}
              description={t(
                "confirmDeleteDesc",
                "This action cannot be undone."
              )}
              key="delete"
              onConfirm={async () => {
                await Promise.all(
                  rows.map((r) => deleteNode({ id: r.id } as any))
                );
                toast.success(t("deleted", "Deleted"));
                ref.current?.refresh();
                fetchNodes();
                fetchTags();
              }}
              title={t("confirmDeleteTitle", "Delete this node?")}
              trigger={
                <Button variant="destructive">{t("delete", "Delete")}</Button>
              }
            />,
          ];
        },
      }}
      columns={columns}
      header={{
        title: t("pageTitle", "Nodes"),
        toolbar: (
          <div className="flex gap-2">
            <RelayForm
              onCreated={() => {
                ref.current?.refresh();
              }}
              trigger={t("relay.create", "Create Relay Entry")}
            />
            <NodeForm
              loading={loading}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  const body = toNodePayload(values) as API.CreateNodeRequest;
                  await createNode(body);
                  toast.success(t("created", "Created"));
                  ref.current?.refresh();
                  fetchNodes();
                  fetchTags();
                  setLoading(false);
                  return true;
                } catch {
                  setLoading(false);
                  return false;
                }
              }}
              title={t("drawerCreateTitle", "Create Landing Node")}
              trigger={t("create", "Create Landing Node")}
            />
          </div>
        ),
      }}
      onSort={async (source, target, items) => {
        const sourceIndex = items.findIndex(
          (item) => String(item.id) === source
        );
        const targetIndex = items.findIndex(
          (item) => String(item.id) === target
        );

        const originalSorts = items.map((item) => item.sort);

        const [movedItem] = items.splice(sourceIndex, 1);
        items.splice(targetIndex, 0, movedItem!);

        const updatedItems = items.map((item, index) => {
          const originalSort = originalSorts[index];
          const newSort = originalSort !== undefined ? originalSort : item.sort;
          return { ...item, sort: newSort };
        });

        const changedItems = updatedItems.filter(
          (item, index) => item.sort !== items[index]?.sort
        );

        if (changedItems.length > 0) {
          resetSortWithNode({
            sort: changedItems.map((item) => ({
              id: item.id,
              sort: item.sort,
            })) as API.SortItem[],
          });
          toast.success(t("sorted_success", "Sorted successfully"));
        }
        return updatedItems;
      }}
      params={[
        {
          key: "search",
        },
        ...(isGroupEnabled
          ? [
              {
                key: "node_group_id",
                placeholder: t("nodeGroups", "Node Groups"),
                options: [
                  { label: t("all", "All"), value: "" },
                  ...(nodeGroupsData?.map((item) => ({
                    label: item.name,
                    value: String(item.id),
                  })) || []),
                ],
              },
            ]
          : []),
      ]}
      request={async (pagination, filter) => {
        const filters = {
          page: pagination.page,
          size: pagination.size,
          search: filter?.search || undefined,
          node_group_id: filter?.node_group_id || undefined,
        };

        const { data } = await filterNodeList({
          ...filters,
          page: 1,
          size: ALL_NODES_PAGE_SIZE,
        });
        const list = (data?.data?.list || []) as API.Node[];
        const rows = buildGroupedNodeRows(list, expandedLandingIds);
        const start = (pagination.page - 1) * pagination.size;
        return {
          list: rows.slice(start, start + pagination.size),
          total: rows.length,
        };
      }}
    />
  );
}
