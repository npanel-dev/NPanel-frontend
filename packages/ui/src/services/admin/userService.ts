// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** CreateUser 创建用户 POST /v1/admin/user */
export async function userServiceCreateUser(
  body: API.CreateUserRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateUserReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user`,
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

/** DeleteUser 删除用户 DELETE /v1/admin/user */
export async function userServiceDeleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserServiceDeleteUserParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteUserReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserBasicInfo 更新用户基本信息 PUT /v1/admin/user/basic */
export async function userServiceUpdateUserBasicInfo(
  body: API.UpdateUserBasicInfoRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateUserBasicInfoReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/basic`,
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

/** BatchDeleteUser 批量删除用户 DELETE /v1/admin/user/batch */
export async function userServiceBatchDeleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserServiceBatchDeleteUserParams,
  options?: { [key: string]: any }
) {
  return request<API.BatchDeleteUserReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/batch`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** CurrentUser 获取当前用户 GET /v1/admin/user/current */
export async function userServiceCurrentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/current`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetUserDetail 获取用户详情 GET /v1/admin/user/detail */
export async function userServiceGetUserDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserServiceGetUserDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserDetailReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetUserList 获取用户列表 GET /v1/admin/user/list */
export async function userServiceGetUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserServiceGetUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetUserLoginLogs 获取用户登录日志 GET /v1/admin/user/login/logs */
export async function userServiceGetUserLoginLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserServiceGetUserLoginLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserLoginLogsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/login/logs`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserNotifySettings 更新用户通知设置 PUT /v1/admin/user/notify */
export async function userServiceUpdateUserNotifySettings(
  body: API.UpdateUserNotifySettingsRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateUserNotifySettingsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/notify`,
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
