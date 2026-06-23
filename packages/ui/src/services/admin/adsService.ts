// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 更新广告 PUT /v1/admin/ads */
export async function adsServiceUpdateAds(
  body: API.UpdateAdsRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateAdsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads`,
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

/** 创建广告 POST /v1/admin/ads */
export async function adsServiceCreateAds(
  body: API.CreateAdsRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateAdsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads`,
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

/** 删除广告 DELETE /v1/admin/ads */
export async function adsServiceDeleteAds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AdsServiceDeleteAdsParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteAdsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取广告详情 GET /v1/admin/ads/detail */
export async function adsServiceGetAds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AdsServiceGetAdsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetAdsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取广告列表 GET /v1/admin/ads/list */
export async function adsServiceGetAdsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AdsServiceGetAdsListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetAdsListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
