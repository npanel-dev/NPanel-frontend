// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** AlipayNotify 支付宝回调 POST /v1/payment/${param0}/alipay/notify */
export async function paymentAlipayNotify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PaymentAlipayNotifyParams,
  options?: { [key: string]: any }
) {
  const { token: param0, ...queryParams } = params;
  return request<API.AlipayNotifyReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/payment/${param0}/alipay/notify`,
    {
      method: "POST",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** EPayNotify 易支付回调 POST /v1/payment/${param0}/epay/notify */
export async function paymentEPayNotify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PaymentEPayNotifyParams,
  options?: { [key: string]: any }
) {
  const { token: param0, ...queryParams } = params;
  return request<API.EPayNotifyReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/payment/${param0}/epay/notify`,
    {
      method: "POST",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** StripeNotify Stripe回调 POST /v1/payment/${param0}/stripe/notify */
export async function paymentStripeNotify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PaymentStripeNotifyParams,
  options?: { [key: string]: any }
) {
  const { token: param0, ...queryParams } = params;
  return request<API.StripeNotifyReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/payment/${param0}/stripe/notify`,
    {
      method: "POST",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** GetAvailablePaymentMethods 获取可用支付方式 GET /v1/public/payment/methods */
export async function paymentGetAvailablePaymentMethods(options?: {
  [key: string]: any;
}) {
  return request<API.PaymentMethodsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/payment/methods`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
