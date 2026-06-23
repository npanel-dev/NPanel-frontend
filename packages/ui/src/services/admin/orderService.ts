// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** CreateOrder 创建订单 POST /v1/admin/order */
export async function orderServiceCreateOrder(
  body: API.CreateOrderRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateOrderReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/order`,
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

/** GetOrderList 获取订单列表 GET /v1/admin/order/list */
export async function orderServiceGetOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.OrderServiceGetOrderListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetOrderListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/order/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateOrderStatus 更新订单状态 PUT /v1/admin/order/status */
export async function orderServiceUpdateOrderStatus(
  body: API.UpdateOrderStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateOrderStatusReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/order/status`,
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
