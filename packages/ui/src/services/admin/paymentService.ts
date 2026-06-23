// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 此处后端没有提供注释 PUT /v1/admin/payment */
export async function paymentServiceUpdatePaymentMethod(
  body: API.UpdatePaymentMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdatePaymentMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment`,
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

/** 此处后端没有提供注释 POST /v1/admin/payment */
export async function paymentServiceCreatePaymentMethod(
  body: API.CreatePaymentMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreatePaymentMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment`,
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

/** 此处后端没有提供注释 DELETE /v1/admin/payment */
export async function paymentServiceDeletePaymentMethod(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PaymentServiceDeletePaymentMethodParams,
  options?: { [key: string]: any }
) {
  return request<API.DeletePaymentMethodReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/payment/list */
export async function paymentServiceGetPaymentMethodList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PaymentServiceGetPaymentMethodListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetPaymentMethodListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/payment/platform */
export async function paymentServiceGetPaymentPlatform(options?: {
  [key: string]: any;
}) {
  return request<API.GetPaymentPlatformReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/platform`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
