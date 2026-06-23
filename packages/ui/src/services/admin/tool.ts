// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** QueryIPLocation 查询IP地理位置 GET /v1/admin/tool/ip/location */
export async function toolQueryIpLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ToolQueryIPLocationParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryIPLocationReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/tool/ip/location`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

export {
  toolQueryIpLocation as queryIpLocation,
  toolGetSystemLog as getSystemLog,
  toolRestartSystem as restartSystem,
  toolGetVersion as getVersion,
};

/** GetSystemLog 获取系统日志 GET /v1/admin/tool/log */
export async function toolGetSystemLog(options?: { [key: string]: any }) {
  return request<API.GetSystemLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/tool/log`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** RestartSystem 重启系统 GET /v1/admin/tool/restart */
export async function toolRestartSystem(options?: { [key: string]: any }) {
  return request<API.RestartSystemReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/tool/restart`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetVersion 获取版本信息 GET /v1/admin/tool/version */
export async function toolGetVersion(options?: { [key: string]: any }) {
  return request<API.GetVersionReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/tool/version`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
