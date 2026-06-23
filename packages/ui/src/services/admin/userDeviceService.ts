// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** UpdateUserDevice 更新用户设备 PUT /v1/admin/user/device */
export async function userDeviceServiceUpdateUserDevice(
  body: API.UpdateUserDeviceRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateUserDeviceReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/device`,
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

/** DeleteUserDevice 删除用户设备 DELETE /v1/admin/user/device */
export async function userDeviceServiceDeleteUserDevice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserDeviceServiceDeleteUserDeviceParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteUserDeviceReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/device`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** KickOfflineByUserDevice 踢下线用户设备 PUT /v1/admin/user/device/kick_offline */
export async function userDeviceServiceKickOfflineByUserDevice(
  body: API.KickOfflineByUserDeviceRequest,
  options?: { [key: string]: any }
) {
  return request<API.KickOfflineByUserDeviceReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/device/kick_offline`,
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
