// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** GetUserSubscribe 获取用户订阅列表 GET /v1/admin/user/subscribe */
export async function userSubscribeServiceGetUserSubscribe(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceGetUserSubscribeParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserSubscribeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserSubscribe 更新用户订阅 PUT /v1/admin/user/subscribe */
export async function userSubscribeServiceUpdateUserSubscribe(
  body: API.UpdateUserSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateUserSubscribeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
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

/** CreateUserSubscribe 创建用户订阅 POST /v1/admin/user/subscribe */
export async function userSubscribeServiceCreateUserSubscribe(
  body: API.CreateUserSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateUserSubscribeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
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

/** DeleteUserSubscribe 删除用户订阅 DELETE /v1/admin/user/subscribe */
export async function userSubscribeServiceDeleteUserSubscribe(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceDeleteUserSubscribeParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteUserSubscribeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetUserSubscribeById 根据ID获取用户订阅详情 GET /v1/admin/user/subscribe/detail */
export async function userSubscribeServiceGetUserSubscribeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceGetUserSubscribeByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserSubscribeByIdReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetUserSubscribeDevices 获取用户订阅设备列表 GET /v1/admin/user/subscribe/device */
export async function userSubscribeServiceGetUserSubscribeDevices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceGetUserSubscribeDevicesParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserSubscribeDevicesReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/device`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetUserSubscribeLogs 获取用户订阅日志 GET /v1/admin/user/subscribe/logs */
export async function userSubscribeServiceGetUserSubscribeLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceGetUserSubscribeLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserSubscribeLogsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/logs`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetUserSubscribeResetTrafficLogs 获取用户订阅重置流量日志 GET /v1/admin/user/subscribe/reset/logs */
export async function userSubscribeServiceGetUserSubscribeResetTrafficLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceGetUserSubscribeResetTrafficLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserSubscribeResetTrafficLogsReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/reset/logs`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** ResetUserSubscribeToken 重置用户订阅令牌 POST /v1/admin/user/subscribe/reset/token */
export async function userSubscribeServiceResetUserSubscribeToken(
  body: API.ResetUserSubscribeTokenRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResetUserSubscribeTokenReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/reset/token`,
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

/** ResetUserSubscribeTraffic 重置用户订阅流量 POST /v1/admin/user/subscribe/reset/traffic */
export async function userSubscribeServiceResetUserSubscribeTraffic(
  body: API.ResetUserSubscribeTrafficRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResetUserSubscribeTrafficReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/reset/traffic`,
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

/** ToggleUserSubscribeStatus 切换用户订阅状态 POST /v1/admin/user/subscribe/toggle */
export async function userSubscribeServiceToggleUserSubscribeStatus(
  body: API.ToggleUserSubscribeStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.ToggleUserSubscribeStatusReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/toggle`,
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

/** GetUserSubscribeTrafficLogs 获取用户订阅流量日志 GET /v1/admin/user/subscribe/traffic_logs */
export async function userSubscribeServiceGetUserSubscribeTrafficLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserSubscribeServiceGetUserSubscribeTrafficLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserSubscribeTrafficLogsReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/traffic_logs`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
