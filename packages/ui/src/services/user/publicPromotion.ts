// @ts-ignore
/* eslint-disable */
// 注意：本文件手写（非 openapi2ts 自动生成），格式与生成文件保持一致。
// 后端 proto: api/public/promotion/v1/promotion.proto
import request from "@workspace/ui/lib/request";

/** ListActiveRechargePromotion 列出当前生效的充值促销活动 GET /v1/public/promotion/recharge/active */
export async function publicPromotionListActiveRechargePromotion(
  options?: { [key: string]: any }
) {
  return request<API.ListActiveRechargePromotionReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/promotion/recharge/active`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
