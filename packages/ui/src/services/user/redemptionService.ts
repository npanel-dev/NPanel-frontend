// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** RedeemCode 兑换兑换码 POST /v1/public/redemption */
export async function redemptionServiceRedeemCode(
  body: API.RedeemCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.RedeemCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/redemption`,
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
