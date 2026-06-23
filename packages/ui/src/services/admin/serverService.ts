// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** Server Management POST /v1/admin/server/create */
export async function serverServiceCreateServer(
  body: API.CreateServerRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateServerReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/create`,
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

/** 此处后端没有提供注释 POST /v1/admin/server/delete */
export async function serverServiceDeleteServer(
  body: API.DeleteServerRequest,
  options?: { [key: string]: any }
) {
  return request<API.DeleteServerReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/delete`,
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

/** 此处后端没有提供注释 GET /v1/admin/server/list */
export async function serverServiceFilterServerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ServerServiceFilterServerListParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterServerListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Migration GET /v1/admin/server/migrate/has */
export async function serverServiceHasMigrateServerNode(options?: {
  [key: string]: any;
}) {
  return request<API.HasMigrateServerNodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/migrate/has`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /v1/admin/server/migrate/run */
export async function serverServiceMigrateServerNode(
  body: API.MigrateServerNodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.MigrateServerNodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/migrate/run`,
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

/** Node Management POST /v1/admin/server/node/create */
export async function serverServiceCreateNode(
  body: API.CreateNodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateNodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/create`,
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

/** 此处后端没有提供注释 POST /v1/admin/server/node/delete */
export async function serverServiceDeleteNode(
  body: API.DeleteNodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.DeleteNodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/delete`,
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

/** 此处后端没有提供注释 GET /v1/admin/server/node/list */
export async function serverServiceFilterNodeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ServerServiceFilterNodeListParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterNodeListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /v1/admin/server/node/sort */
export async function serverServiceResetSortWithNode(
  body: API.ResetSortRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResetSortReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/sort`,
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

/** 此处后端没有提供注释 POST /v1/admin/server/node/status/toggle */
export async function serverServiceToggleNodeStatus(
  body: API.ToggleNodeStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.ToggleNodeStatusReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/server/node/status/toggle`,
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

/** 此处后端没有提供注释 GET /v1/admin/server/node/tags */
export async function serverServiceQueryNodeTag(options?: {
  [key: string]: any;
}) {
  return request<API.QueryNodeTagReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/tags`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /v1/admin/server/node/update */
export async function serverServiceUpdateNode(
  body: API.UpdateNodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateNodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/update`,
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

/** 此处后端没有提供注释 GET /v1/admin/server/protocols */
export async function serverServiceGetServerProtocols(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ServerServiceGetServerProtocolsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetServerProtocolsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/protocols`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Sort POST /v1/admin/server/server/sort */
export async function serverServiceResetSortWithServer(
  body: API.ResetSortRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResetSortReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/server/sort`,
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

/** 此处后端没有提供注释 POST /v1/admin/server/update */
export async function serverServiceUpdateServer(
  body: API.UpdateServerRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateServerReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/update`,
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
