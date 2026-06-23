// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 创建订阅应用配置 POST /v1/admin/application */
export async function subscribeApplicationServiceCreateSubscribeApplication(
  body: API.CreateSubscribeApplicationRequest,
  options?: { [key: string]: any }
) {
  return request<API.SubscribeApplicationReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/application`,
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

/** 预览订阅模板 GET /v1/admin/application/preview */
export async function subscribeApplicationServicePreviewSubscribeTemplate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SubscribeApplicationServicePreviewSubscribeTemplateParams,
  options?: { [key: string]: any }
) {
  return request<API.PreviewSubscribeTemplateReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/application/preview`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 更新订阅应用配置 PUT /v1/admin/application/subscribe_application */
export async function subscribeApplicationServiceUpdateSubscribeApplication(
  body: API.UpdateSubscribeApplicationRequest,
  options?: { [key: string]: any }
) {
  return request<API.SubscribeApplicationReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/application/subscribe_application`,
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

/** 删除订阅应用配置 DELETE /v1/admin/application/subscribe_application */
export async function subscribeApplicationServiceDeleteSubscribeApplication(
  body: API.DeleteSubscribeApplicationRequest,
  options?: { [key: string]: any }
) {
  return request<API.DeleteSubscribeApplicationReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/application/subscribe_application`,
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

/** 获取订阅应用配置列表 GET /v1/admin/application/subscribe_application_list */
export async function subscribeApplicationServiceGetSubscribeApplicationList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SubscribeApplicationServiceGetSubscribeApplicationListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetSubscribeApplicationListReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/application/subscribe_application_list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
