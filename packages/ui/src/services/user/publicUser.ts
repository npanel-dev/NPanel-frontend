// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** QueryUserAffiliate 查询用户推荐数量 GET /v1/public/user/affiliate/count */
export async function publicUserQueryUserAffiliate(options?: {
  [key: string]: any;
}) {
  return request<API.QueryUserAffiliateCountReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/affiliate/count`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** QueryUserAffiliateList 查询用户推荐列表 GET /v1/public/user/affiliate/list */
export async function publicUserQueryUserAffiliateList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserQueryUserAffiliateListParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryUserAffiliateListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/affiliate/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** QueryUserBalanceLog 查询用户余额日志 GET /v1/public/user/balance_log */
export async function publicUserQueryUserBalanceLog(options?: {
  [key: string]: any;
}) {
  return request<API.QueryUserBalanceLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/balance_log`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateBindEmail 更新绑定邮箱 PUT /v1/public/user/bind_email */
export async function publicUserUpdateBindEmail(
  body: API.UpdateBindEmailRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/bind_email`,
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

/** UpdateBindMobile 更新绑定手机 PUT /v1/public/user/bind_mobile */
export async function publicUserUpdateBindMobile(
  body: API.UpdateBindMobileRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/bind_mobile`,
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

/** BindOAuth 绑定OAuth POST /v1/public/user/bind_oauth */
export async function publicUserBindOAuth(
  body: API.BindOAuthRequest,
  options?: { [key: string]: any }
) {
  return request<API.BindOAuthReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/bind_oauth`,
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

/** BindOAuthCallback OAuth回调 POST /v1/public/user/bind_oauth/callback */
export async function publicUserBindOAuthCallback(
  body: API.BindOAuthCallbackRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/public/user/bind_oauth/callback`,
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

/** BindTelegram 绑定Telegram GET /v1/public/user/bind_telegram */
export async function publicUserBindTelegram(options?: { [key: string]: any }) {
  return request<API.BindTelegramReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/bind_telegram`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** QueryUserCommissionLog 查询用户佣金日志 GET /v1/public/user/commission_log */
export async function publicUserQueryUserCommissionLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserQueryUserCommissionLogParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryUserCommissionLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/commission_log`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** CommissionWithdraw 佣金提现 POST /v1/public/user/commission_withdraw */
export async function publicUserCommissionWithdraw(
  body: API.CommissionWithdrawRequest,
  options?: { [key: string]: any }
) {
  return request<API.WithdrawalLog>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/public/user/commission_withdraw`,
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

/** TransferCommissionToBalance 佣金划转到余额 POST /v1/public/user/commission/transfer_balance */
export async function publicUserTransferCommissionToBalance(
  body: { amount?: number | string },
  options?: { [key: string]: any }
) {
  return request<any>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/public/user/commission/transfer_balance`,
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

/** DeleteCurrentUserAccount 删除当前用户账号 DELETE /v1/public/user/current_user_account */
export async function publicUserDeleteCurrentUserAccount(options?: {
  [key: string]: any;
}) {
  return request<any>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/public/user/current_user_account`,
    {
      method: "DELETE",
      ...(options || {}),
    }
  );
}

/** GetDeviceOnlineStatistics 获取设备在线统计 GET /v1/public/user/device_online_statistics */
export async function publicUserGetDeviceOnlineStatistics(options?: {
  [key: string]: any;
}) {
  return request<API.GetDeviceOnlineStatisticsReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/public/user/device_online_statistics`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** DeviceWSConnect 设备WebSocket连接 GET /v1/public/user/device_ws_connect */
export async function publicUserDeviceWsConnect(options?: {
  [key: string]: any;
}) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/device_ws_connect`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetDeviceList 获取设备列表 GET /v1/public/user/devices */
export async function publicUserGetDeviceList(options?: {
  [key: string]: any;
}) {
  return request<API.GetDeviceListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/devices`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** QueryUserInfo 查询用户信息 GET /v1/public/user/info */
export async function publicUserQueryUserInfo(options?: {
  [key: string]: any;
}) {
  return request<API.User>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/info`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetLoginLog 获取登录日志 GET /v1/public/user/login_log */
export async function publicUserGetLoginLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserGetLoginLogParams,
  options?: { [key: string]: any }
) {
  return request<API.GetLoginLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/login_log`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserNotify 更新通知设置 PUT /v1/public/user/notify */
export async function publicUserUpdateUserNotify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserUpdateUserNotifyParams,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/notify`,
    {
      method: "PUT",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetOAuthMethods 获取OAuth方法 GET /v1/public/user/oauth_methods */
export async function publicUserGetOAuthMethods(options?: {
  [key: string]: any;
}) {
  return request<API.GetOAuthMethodsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/oauth_methods`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** UpdateUserPassword 更新密码 PUT /v1/public/user/password */
export async function publicUserUpdateUserPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserUpdateUserPasswordParams,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/password`,
    {
      method: "PUT",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserRules 更新用户规则 PUT /v1/public/user/rules */
export async function publicUserUpdateUserRules(
  body: API.UpdateUserRulesRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/rules`,
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

/** QueryUserSubscribe 查询用户订阅 GET /v1/public/user/subscribe */
export async function publicUserQueryUserSubscribe(options?: {
  [key: string]: any;
}) {
  return request<API.QueryUserSubscribeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/subscribe`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetSubscribeLog 获取订阅日志 GET /v1/public/user/subscribe_log */
export async function publicUserGetSubscribeLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserGetSubscribeLogParams,
  options?: { [key: string]: any }
) {
  return request<API.GetSubscribeLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/subscribe_log`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UpdateUserSubscribeNote 更新用户订阅备注 PUT /v1/public/user/subscribe_note */
export async function publicUserUpdateUserSubscribeNote(
  body: API.UpdateUserSubscribeNoteRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/subscribe_note`,
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

/** ResetUserSubscribeToken 重置订阅令牌 PUT /v1/public/user/subscribe_token */
export async function publicUserResetUserSubscribeToken(
  body: API.ResetUserSubscribeTokenRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/subscribe_token`,
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

/** GetTawkIdentity 获取Tawk访客身份签名 GET /v1/public/user/tawk_identity */
export async function publicUserGetTawkIdentity(options?: {
  [key: string]: any;
}) {
  return request<API.TawkIdentityReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/tawk_identity`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** GetUserTrafficStats 获取用户流量统计 GET /v1/public/user/traffic_stats */
export async function publicUserGetUserTrafficStats(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserGetUserTrafficStatsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserTrafficStatsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/traffic_stats`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UnbindDevice 解绑设备 PUT /v1/public/user/unbind_device */
export async function publicUserUnbindDevice(
  body: API.UnbindDeviceRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/unbind_device`,
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

/** UnbindOAuth 解绑OAuth POST /v1/public/user/unbind_oauth */
export async function publicUserUnbindOAuth(
  body: API.UnbindOAuthRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/unbind_oauth`,
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

/** UnbindTelegram 解绑Telegram POST /v1/public/user/unbind_telegram */
export async function publicUserUnbindTelegram(options?: {
  [key: string]: any;
}) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/unbind_telegram`,
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Unsubscribe 退订 POST /v1/public/user/unsubscribe */
export async function publicUserUnsubscribe(
  body: API.UnsubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/unsubscribe`,
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

/** PreUnsubscribe 预退订 POST /v1/public/user/unsubscribe/pre */
export async function publicUserPreUnsubscribe(
  body: API.PreUnsubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.PreUnsubscribeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/unsubscribe/pre`,
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

/** VerifyEmail 验证邮箱 POST /v1/public/user/verify_email */
export async function publicUserVerifyEmail(
  body: API.VerifyEmailRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/verify_email`,
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

/** QueryWithdrawalLog 查询提现日志 GET /v1/public/user/withdrawal_log */
export async function publicUserQueryWithdrawalLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicUserQueryWithdrawalLogParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryWithdrawalLogReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/user/withdrawal_log`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
