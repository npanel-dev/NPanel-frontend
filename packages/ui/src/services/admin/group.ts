// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** ===== 分组配置管理 =====
 GetGroupConfig 获取分组配置 GET /v1/admin/group/config */
export async function groupGetGroupConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GroupGetGroupConfigParams,
  options?: { [key: string]: any }
) {
  return request<API.GetGroupConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/config`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

export const getGroupConfig: (...args: any[]) => Promise<any> =
  groupGetGroupConfig as any;
export const updateGroupConfig: (...args: any[]) => Promise<any> =
  groupUpdateGroupConfig as any;
export const exportGroupResult: (...args: any[]) => Promise<any> =
  groupExportGroupResult as any;
export const getGroupHistory: (...args: any[]) => Promise<any> =
  groupGetGroupHistory as any;
export const getGroupHistoryDetail: (...args: any[]) => Promise<any> =
  groupGetGroupHistoryDetail as any;
export const migrateUsers: (...args: any[]) => Promise<any> =
  groupMigrateUsers as any;
export const updateNodeGroup: (...args: any[]) => Promise<any> =
  groupUpdateNodeGroup as any;
export const createNodeGroup: (...args: any[]) => Promise<any> =
  groupCreateNodeGroup as any;
export const deleteNodeGroup: (...args: any[]) => Promise<any> =
  groupDeleteNodeGroup as any;
export const getNodeGroupList: (...args: any[]) => Promise<any> =
  groupGetNodeGroupList as any;
export const previewUserNodes: (...args: any[]) => Promise<any> =
  groupPreviewUserNodes as any;
export const recalculateGroup: (...args: any[]) => Promise<any> =
  groupRecalculateGroup as any;
export const getRecalculationStatus: (...args: any[]) => Promise<any> =
  groupGetRecalculationStatus as any;
export const resetGroups: (...args: any[]) => Promise<any> =
  groupResetGroups as any;
export const getSubscribeGroupMapping: (...args: any[]) => Promise<any> =
  groupGetSubscribeGroupMapping as any;
export const getSubscribeMapping: (...args: any[]) => Promise<any> =
  groupGetSubscribeGroupMapping as any;
export const bindNodeGroups: (...args: any[]) => Promise<any> = (
  body: Record<string, unknown>,
  options?: { [key: string]: any }
) =>
  request(`${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node/bind`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });

/** UpdateGroupConfig 更新分组配置 PUT /v1/admin/group/config */
export async function groupUpdateGroupConfig(
  body: API.UpdateGroupConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateGroupConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/config`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** ExportGroupResult 导出分组结果 GET /v1/admin/group/export */
export async function groupExportGroupResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GroupExportGroupResultParams,
  options?: { [key: string]: any }
) {
  return request<API.ExportGroupResultReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/export`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetGroupHistory 获取分组历史 GET /v1/admin/group/history */
export async function groupGetGroupHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GroupGetGroupHistoryParams,
  options?: { [key: string]: any }
) {
  return request<API.GetGroupHistoryReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/history`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetGroupHistoryDetail 获取分组历史详情 GET /v1/admin/group/history/detail */
export async function groupGetGroupHistoryDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GroupGetGroupHistoryDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.GetGroupHistoryDetailReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/history/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** MigrateUsers 迁移用户到另一个分组 POST /v1/admin/group/migrate */
export async function groupMigrateUsers(
  body: API.MigrateUsersRequest,
  options?: { [key: string]: any }
) {
  return request<API.MigrateUsersReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/migrate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** UpdateNodeGroup 更新节点组 PUT /v1/admin/group/node */
export async function groupUpdateNodeGroup(
  body: API.UpdateNodeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateNodeGroupReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** CreateNodeGroup 创建节点组 POST /v1/admin/group/node */
export async function groupCreateNodeGroup(
  body: API.CreateNodeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateNodeGroupReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** DeleteNodeGroup 删除节点组 DELETE /v1/admin/group/node */
export async function groupDeleteNodeGroup(
  body: API.DeleteNodeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.DeleteNodeGroupReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** ===== 节点组管理 =====
 GetNodeGroupList 获取节点组列表 GET /v1/admin/group/node/list */
export async function groupGetNodeGroupList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GroupGetNodeGroupListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetNodeGroupListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** PreviewUserNodes 预览用户节点 GET /v1/admin/group/preview */
export async function groupPreviewUserNodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GroupPreviewUserNodesParams,
  options?: { [key: string]: any }
) {
  return request<API.PreviewUserNodesReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/preview`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** ===== 分组操作 =====
 RecalculateGroup 重新计算分组 POST /v1/admin/group/recalculate */
export async function groupRecalculateGroup(
  body: API.RecalculateGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.RecalculateGroupReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/recalculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** GetRecalculationStatus 获取重新计算状态 GET /v1/admin/group/recalculation/status */
export async function groupGetRecalculationStatus(options?: {
  [key: string]: any;
}) {
  return request<API.GetRecalculationStatusReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/group/recalculation/status`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** ResetGroups 重置所有分组 POST /v1/admin/group/reset */
export async function groupResetGroups(
  body: API.ResetGroupsRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResetGroupsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** GetSubscribeGroupMapping 获取订阅组映射 GET /v1/admin/group/subscribe/mapping */
export async function groupGetSubscribeGroupMapping(options?: {
  [key: string]: any;
}) {
  return request<API.GetSubscribeGroupMappingReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/subscribe/mapping`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
