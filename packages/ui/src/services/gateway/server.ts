// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** GetServerConfig 获取服务器配置 GET /v1/server/config */
export async function serverGetServerConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ServerGetServerConfigParams,
  options?: { [key: string]: any }
) {
  return request<API.GetServerConfigReply>("/v1/server/config", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** PushOnlineUsers 推送在线用户 POST /v1/server/online */
export async function serverPushOnlineUsers(
  body: API.PushOnlineUsersRequest,
  options?: { [key: string]: any }
) {
  return request<API.PushOnlineUsersReply>("/v1/server/online", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** PushUserTraffic 推送用户流量 POST /v1/server/push */
export async function serverPushUserTraffic(
  body: API.PushUserTrafficRequest,
  options?: { [key: string]: any }
) {
  return request<API.PushUserTrafficReply>("/v1/server/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** SessionCheck 会话准入检查 POST /v1/server/session/check */
export async function serverSessionCheck(
  body: API.SessionCheckRequest,
  options?: { [key: string]: any }
) {
  return request<API.SessionCheckResponse>("/v1/server/session/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** SessionRelease 会话释放 POST /v1/server/session/release */
export async function serverSessionRelease(
  body: API.SessionReleaseRequest,
  options?: { [key: string]: any }
) {
  return request<API.SessionReleaseResponse>("/v1/server/session/release", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** PushServerStatus 推送服务器状态 POST /v1/server/status */
export async function serverPushServerStatus(
  body: API.PushServerStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.PushServerStatusReply>("/v1/server/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** GetServerUserList 获取用户列表 GET /v1/server/user */
export async function serverGetServerUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ServerGetServerUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetServerUserListReply>("/v1/server/user", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** QueryServerProtocolConfig 查询服务器协议配置 GET /v2/server/${param0} */
export async function serverQueryServerProtocolConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ServerQueryServerProtocolConfigParams,
  options?: { [key: string]: any }
) {
  const { serverId: param0, ...queryParams } = params;
  return request<API.QueryServerProtocolConfigReply>(`/v2/server/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
