// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** GetUserAuthMethod 获取用户认证方法 GET /v1/admin/user/auth_method */
export async function userAuthMethodServiceGetUserAuthMethod(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserAuthMethodServiceGetUserAuthMethodParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserAuthMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserAuthMethod 更新用户认证方法 PUT /v1/admin/user/auth_method */
export async function userAuthMethodServiceUpdateUserAuthMethod(
  body: API.UpdateUserAuthMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateUserAuthMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
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

/** CreateUserAuthMethod 创建用户认证方法 POST /v1/admin/user/auth_method */
export async function userAuthMethodServiceCreateUserAuthMethod(
  body: API.CreateUserAuthMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateUserAuthMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
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

/** DeleteUserAuthMethod 删除用户认证方法 DELETE /v1/admin/user/auth_method */
export async function userAuthMethodServiceDeleteUserAuthMethod(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserAuthMethodServiceDeleteUserAuthMethodParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteUserAuthMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
