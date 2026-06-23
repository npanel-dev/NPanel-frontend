// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** System Log APIs (proxy_system_log table) GET /v1/admin/log/balance/list */
export async function logServiceFilterBalanceLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterBalanceLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterBalanceLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/balance/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/commission/list */
export async function logServiceFilterCommissionLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterCommissionLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterCommissionLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/commission/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/email/list */
export async function logServiceFilterEmailLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterEmailLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterEmailLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/email/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/gift/list */
export async function logServiceFilterGiftLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterGiftLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterGiftLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/gift/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/login/list */
export async function logServiceFilterLoginLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterLoginLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterLoginLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/login/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/message/list */
export async function logServiceGetMessageLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceGetMessageLogListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetMessageLogListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/message/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/mobile/list */
export async function logServiceFilterMobileLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterMobileLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterMobileLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/mobile/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/register/list */
export async function logServiceFilterRegisterLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterRegisterLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterRegisterLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/register/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/server/traffic/list */
export async function logServiceFilterServerTrafficLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterServerTrafficLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterServerTrafficLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/server/traffic/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Log Setting APIs (proxy_system table) GET /v1/admin/log/setting */
export async function logServiceGetLogSetting(options?: {
  [key: string]: any;
}) {
  return request<API.GetLogSettingReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/setting`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /v1/admin/log/setting */
export async function logServiceUpdateLogSetting(
  body: API.UpdateLogSettingRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateLogSettingReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/setting`,
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

/** 此处后端没有提供注释 GET /v1/admin/log/subscribe/list */
export async function logServiceFilterSubscribeLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterSubscribeLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterSubscribeLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/subscribe/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/subscribe/reset/list */
export async function logServiceFilterResetSubscribeLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterResetSubscribeLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterResetSubscribeLogReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/log/subscribe/reset/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/log/subscribe/traffic/list */
export async function logServiceFilterUserSubscribeTrafficLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterUserSubscribeTrafficLogParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterUserSubscribeTrafficLogReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/log/subscribe/traffic/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Traffic Log APIs (proxy_traffic_log table) GET /v1/admin/log/traffic/details */
export async function logServiceFilterTrafficLogDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogServiceFilterTrafficLogDetailsParams,
  options?: { [key: string]: any }
) {
  return request<API.FilterTrafficLogDetailsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/log/traffic/details`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
