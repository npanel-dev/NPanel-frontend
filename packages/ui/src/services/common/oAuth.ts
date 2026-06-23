// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** AppleLoginCallback Apple登录回调处理 POST /v1/auth/oauth/callback/apple */
export async function oAuthAppleLoginCallback(
  body: API.AppleLoginCallbackRequest,
  options?: { [key: string]: any }
) {
  return request<API.CallbackReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/oauth/callback/apple`,
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

/** OAuthLogin 获取OAuth提供商的授权URL POST /v1/auth/oauth/login */
export async function oAuthOAuthLogin(
  body: API.OAuthLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginRedirectReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/oauth/login`,
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

/** OAuthLoginGetToken 处理OAuth回调并返回JWT token POST /v1/auth/oauth/login/token */
export async function oAuthOAuthLoginGetToken(
  body: API.OAuthLoginGetTokenRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginTokenReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/oauth/login/token`,
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

export const appleLoginCallback: (...args: any[]) => Promise<any> =
  oAuthAppleLoginCallback as any;
export const oAuthLogin: (...args: any[]) => Promise<any> =
  oAuthOAuthLogin as any;
export const oAuthLoginGetToken: (...args: any[]) => Promise<any> =
  oAuthOAuthLoginGetToken as any;
