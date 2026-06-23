// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 获取认证方法配置 GET /v1/admin/auth-method/config */
export async function authMethodServiceGetAuthMethodConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AuthMethodServiceGetAuthMethodConfigParams,
  options?: { [key: string]: any }
) {
  return request<API.AuthMethodConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/auth-method/config`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 更新认证方法配置 PUT /v1/admin/auth-method/config */
export async function authMethodServiceUpdateAuthMethodConfig(
  body: API.UpdateAuthMethodConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.AuthMethodConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/auth-method/config`,
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

/** 获取邮件支持平台列表 GET /v1/admin/auth-method/email_platform */
export async function authMethodServiceGetEmailPlatform(options?: {
  [key: string]: any;
}) {
  return request<API.PlatformListReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/auth-method/email_platform`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 获取认证方法列表 GET /v1/admin/auth-method/list */
export async function authMethodServiceGetAuthMethodList(options?: {
  [key: string]: any;
}) {
  return request<API.AuthMethodListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/auth-method/list`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 获取短信支持平台列表 GET /v1/admin/auth-method/sms_platform */
export async function authMethodServiceGetSmsPlatform(options?: {
  [key: string]: any;
}) {
  return request<API.PlatformListReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/auth-method/sms_platform`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 测试邮件发送 POST /v1/admin/auth-method/test_email_send */
export async function authMethodServiceTestEmailSend(
  body: API.TestEmailSendRequest,
  options?: { [key: string]: any }
) {
  return request<API.ActionReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/auth-method/test_email_send`,
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

/** 测试短信发送 POST /v1/admin/auth-method/test_sms_send */
export async function authMethodServiceTestSmsSend(
  body: API.TestSmsSendRequest,
  options?: { [key: string]: any }
) {
  return request<API.ActionReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/auth-method/test_sms_send`,
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
