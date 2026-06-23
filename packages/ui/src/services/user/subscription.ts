// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** GetSubscribeConfig 获取订阅配置
 根据老项目请求参数生成订阅配置 GET /v1/subscribe/${param0} */
export async function subscriptionGetSubscribeConfig2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SubscriptionGetSubscribeConfigParams,
  options?: { [key: string]: any }
) {
  const { token: param0, ...queryParams } = params;
  return request<API.GetSubscribeConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/subscribe/${param0}`,
    {
      method: "GET",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** GetSubscribeConfig 获取订阅配置
 根据老项目请求参数生成订阅配置 GET /v1/subscribe/config */
export async function subscriptionGetSubscribeConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SubscriptionGetSubscribeConfigParams,
  options?: { [key: string]: any }
) {
  return request<API.GetSubscribeConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/subscribe/config`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
