// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** GetCurrencyConfig 获取货币配置 GET /v1/admin/system/currency_config */
export async function systemServiceGetCurrencyConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetCurrencyConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/currency_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateCurrencyConfig 更新货币配置 PUT /v1/admin/system/currency_config */
export async function systemServiceUpdateCurrencyConfig(
  body: API.UpdateCurrencyConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateCurrencyConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/currency_config`,
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

/** GetNodeMultiplier 获取节点倍率 GET /v1/admin/system/get_node_multiplier */
export async function systemServiceGetNodeMultiplier(options?: {
  [key: string]: any;
}) {
  return request<API.GetNodeMultiplierReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/system/get_node_multiplier`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetInviteConfig 获取邀请配置 GET /v1/admin/system/invite_config */
export async function systemServiceGetInviteConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetInviteConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/invite_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateInviteConfig 更新邀请配置 PUT /v1/admin/system/invite_config */
export async function systemServiceUpdateInviteConfig(
  body: API.UpdateInviteConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateInviteConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/invite_config`,
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

/** GetSystemModule 获取系统模块信息 GET /v1/admin/system/module */
export async function systemServiceGetSystemModule(options?: {
  [key: string]: any;
}) {
  return request<API.GetSystemModuleReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/module`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetNodeConfig 获取节点配置 GET /v1/admin/system/node_config */
export async function systemServiceGetNodeConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetNodeConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/node_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateNodeConfig 更新节点配置 PUT /v1/admin/system/node_config */
export async function systemServiceUpdateNodeConfig(
  body: API.UpdateNodeConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateNodeConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/node_config`,
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

/** PreViewNodeMultiplier 预览节点倍率 GET /v1/admin/system/node_multiplier/preview */
export async function systemServicePreViewNodeMultiplier(options?: {
  [key: string]: any;
}) {
  return request<API.PreViewNodeMultiplierReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/system/node_multiplier/preview`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetPrivacyPolicyConfig 获取隐私政策配置 GET /v1/admin/system/privacy */
export async function systemServiceGetPrivacyPolicyConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetPrivacyPolicyConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/privacy`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdatePrivacyPolicyConfig 更新隐私政策配置 PUT /v1/admin/system/privacy */
export async function systemServiceUpdatePrivacyPolicyConfig(
  body: API.UpdatePrivacyPolicyConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdatePrivacyPolicyConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/privacy`,
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

/** GetRegisterConfig 获取注册配置 GET /v1/admin/system/register_config */
export async function systemServiceGetRegisterConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetRegisterConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/register_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateRegisterConfig 更新注册配置 PUT /v1/admin/system/register_config */
export async function systemServiceUpdateRegisterConfig(
  body: API.UpdateRegisterConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateRegisterConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/register_config`,
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

/** SetNodeMultiplier 设置节点倍率 POST /v1/admin/system/set_node_multiplier */
export async function systemServiceSetNodeMultiplier(
  body: API.SetNodeMultiplierRequest,
  options?: { [key: string]: any }
) {
  return request<API.SetNodeMultiplierReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/system/set_node_multiplier`,
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

/** SettingTelegramBot 设置Telegram机器人 POST /v1/admin/system/setting_telegram_bot */
export async function systemServiceSettingTelegramBot(
  body: API.SettingTelegramBotRequest,
  options?: { [key: string]: any }
) {
  return request<API.SettingTelegramBotReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/system/setting_telegram_bot`,
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

/** GetSiteConfig 获取站点配置 GET /v1/admin/system/site_config */
export async function systemServiceGetSiteConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetSiteConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/site_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateSiteConfig 更新站点配置 PUT /v1/admin/system/site_config */
export async function systemServiceUpdateSiteConfig(
  body: API.UpdateSiteConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateSiteConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/site_config`,
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

/** GetSubscribeConfig 获取订阅配置 GET /v1/admin/system/subscribe_config */
export async function systemServiceGetSubscribeConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetSubscribeConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/subscribe_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateSubscribeConfig 更新订阅配置 PUT /v1/admin/system/subscribe_config */
export async function systemServiceUpdateSubscribeConfig(
  body: API.UpdateSubscribeConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateSubscribeConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/subscribe_config`,
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

/** GetTawkConfig 获取Tawk客服配置 GET /v1/admin/system/tawk_config */
export async function systemServiceGetTawkConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetTawkConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/tawk_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateTawkConfig 更新Tawk客服配置 PUT /v1/admin/system/tawk_config */
export async function systemServiceUpdateTawkConfig(
  body: API.UpdateTawkConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateTawkConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/tawk_config`,
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

/** GetTosConfig 获取服务条款配置 GET /v1/admin/system/tos_config */
export async function systemServiceGetTosConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetTosConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/tos_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateTosConfig 更新服务条款配置 PUT /v1/admin/system/tos_config */
export async function systemServiceUpdateTosConfig(
  body: API.UpdateTosConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateTosConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/tos_config`,
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

/** GetVerifyCodeConfig 获取验证码配置 GET /v1/admin/system/verify_code_config */
export async function systemServiceGetVerifyCodeConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetVerifyCodeConfigReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/system/verify_code_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateVerifyCodeConfig 更新验证码配置 PUT /v1/admin/system/verify_code_config */
export async function systemServiceUpdateVerifyCodeConfig(
  body: API.UpdateVerifyCodeConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateVerifyCodeConfigReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/system/verify_code_config`,
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

/** GetVerifyConfig 获取验证配置 GET /v1/admin/system/verify_config */
export async function systemServiceGetVerifyConfig(options?: {
  [key: string]: any;
}) {
  return request<API.GetVerifyConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/verify_config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateVerifyConfig 更新验证配置 PUT /v1/admin/system/verify_config */
export async function systemServiceUpdateVerifyConfig(
  body: API.UpdateVerifyConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateVerifyConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/system/verify_config`,
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
