// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** UpdateCoupon 更新优惠券 PUT /v1/admin/coupon */
export async function couponServiceUpdateCoupon(
  body: API.UpdateCouponRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateCouponReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/coupon`,
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

/** CreateCoupon 创建优惠券 POST /v1/admin/coupon */
export async function couponServiceCreateCoupon(
  body: API.CreateCouponRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateCouponReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/coupon`,
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

/** DeleteCoupon 删除优惠券 DELETE /v1/admin/coupon */
export async function couponServiceDeleteCoupon(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CouponServiceDeleteCouponParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteCouponReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/coupon`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** BatchDeleteCoupon 批量删除优惠券 DELETE /v1/admin/coupon/batch */
export async function couponServiceBatchDeleteCoupon(
  body: API.BatchDeleteCouponRequest,
  options?: { [key: string]: any }
) {
  return request<API.BatchDeleteCouponReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/coupon/batch`,
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

/** GetCouponList 获取优惠券列表 GET /v1/admin/coupon/list */
export async function couponServiceGetCouponList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CouponServiceGetCouponListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetCouponListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/coupon/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
