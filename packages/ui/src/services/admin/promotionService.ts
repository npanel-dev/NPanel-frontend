// @ts-ignore
/* eslint-disable */
// 注意：本文件手写（非 openapi2ts 自动生成），格式与生成文件保持一致。
// 后端 proto: api/admin/promotion/v1/promotion.proto
import request from "@workspace/ui/lib/request";

/** CreateRechargePromotion 创建充值促销活动 POST /v1/admin/promotion/recharge */
export async function promotionServiceCreateRechargePromotion(
  body: API.CreateRechargePromotionRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateRechargePromotionReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/promotion/recharge`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: body,
      ...(options || {}),
    }
  );
}

/** UpdateRechargePromotion 更新充值促销活动 PUT /v1/admin/promotion/recharge */
export async function promotionServiceUpdateRechargePromotion(
  body: API.UpdateRechargePromotionRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateRechargePromotionReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/promotion/recharge`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: body,
      ...(options || {}),
    }
  );
}

/** DeleteRechargePromotion 删除充值促销活动 DELETE /v1/admin/promotion/recharge (body) */
export async function promotionServiceDeleteRechargePromotion(
  body: API.DeleteRechargePromotionRequest,
  options?: { [key: string]: any }
) {
  return request<API.DeleteRechargePromotionReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/promotion/recharge`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: body,
      ...(options || {}),
    }
  );
}

/** GetRechargePromotionList 获取充值促销活动列表 GET /v1/admin/promotion/recharge/list */
export async function promotionServiceGetRechargePromotionList(
  params: API.RechargePromotionServiceGetRechargePromotionListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetRechargePromotionListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/promotion/recharge/list`,
    {
      method: "GET",
      params: { ...params },
      ...(options || {}),
    }
  );
}

/** UpdateRechargePromotionStatus 快速启停活动 PUT /v1/admin/promotion/recharge/status */
export async function promotionServiceUpdateRechargePromotionStatus(
  body: API.UpdateRechargePromotionStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateRechargePromotionStatusReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/promotion/recharge/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: body,
      ...(options || {}),
    }
  );
}
