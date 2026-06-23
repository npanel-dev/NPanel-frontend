// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 此处后端没有提供注释 POST /v1/public/order/close */
export async function publicOrderCloseOrder(
  body: API.CloseOrderRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/close`,
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

/** 此处后端没有提供注释 GET /v1/public/order/detail */
export async function publicOrderQueryOrderDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicOrderQueryOrderDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.OrderDetail>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/public/order/list */
export async function publicOrderQueryOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicOrderQueryOrderListParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryOrderListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /v1/public/order/pre */
export async function publicOrderPreCreateOrder(
  body: API.PreCreateOrderRequest,
  options?: { [key: string]: any }
) {
  return request<API.PreCreateOrderReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/pre`,
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

/** 此处后端没有提供注释 POST /v1/public/order/purchase */
export async function publicOrderPurchase(
  body: API.PurchaseRequest,
  options?: { [key: string]: any }
) {
  return request<API.PurchaseReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/purchase`,
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

/** 此处后端没有提供注释 POST /v1/public/order/recharge */
export async function publicOrderRecharge(
  body: API.RechargeRequest,
  options?: { [key: string]: any }
) {
  return request<API.RechargeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/recharge`,
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

/** 此处后端没有提供注释 POST /v1/public/order/renewal */
export async function publicOrderRenewal(
  body: API.RenewalRequest,
  options?: { [key: string]: any }
) {
  return request<API.RenewalReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/renewal`,
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

/** 此处后端没有提供注释 POST /v1/public/order/reset */
export async function publicOrderResetTraffic(
  body: API.ResetTrafficRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResetTrafficReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/reset`,
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
