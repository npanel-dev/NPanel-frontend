// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** Get ads list GET /v1/common/ads */
export async function commonGetAds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CommonGetAdsParams,
  options?: { [key: string]: any }
) {
  return request<API.GetAdsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/ads`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Check verification code POST /v1/common/check_verification_code */
export async function commonCheckVerificationCode(
  body: API.CheckVerificationCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.CheckVerificationCodeReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/common/check_verification_code`,
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

/** Get subscribe client list GET /v1/common/client */
export async function commonGetClient(options?: { [key: string]: any }) {
  return request<API.GetClientReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/client`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Heartbeat GET /v1/common/heartbeat */
export async function commonHeartbeat(options?: { [key: string]: any }) {
  return request<API.HeartbeatReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/heartbeat`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Send email verification code.
 Error codes: 200 success (queued); 90016 invalid email; 90004 email disabled or SMTP not configured;
 401 send too frequently; 90015 daily limit; 20001 email exists (register); 20002 user not found (security);
 500 internal; 80001 queue enqueue failed. POST /v1/common/send_code */
export async function commonSendEmailCode(
  body: API.SendEmailCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.SendCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/send_code`,
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

/** Send SMS verification code POST /v1/common/send_sms_code */
export async function commonSendSmsCode(
  body: API.SendSmsCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.SendCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/send_sms_code`,
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

/** Get global config GET /v1/common/site/config */
export async function commonGetGlobalConfig(options?: { [key: string]: any }) {
  return request<API.GetGlobalConfigReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/site/config`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get privacy policy GET /v1/common/site/privacy */
export async function commonGetPrivacyPolicy(options?: { [key: string]: any }) {
  return request<API.GetPrivacyPolicyReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/site/privacy`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get statistics GET /v1/common/site/stat */
export async function commonGetStat(options?: { [key: string]: any }) {
  return request<API.GetStatReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/site/stat`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get TOS (Terms of Service) GET /v1/common/site/tos */
export async function commonGetTos(options?: { [key: string]: any }) {
  return request<API.GetTosReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/common/site/tos`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

export const getAds: (...args: any[]) => Promise<any> = commonGetAds as any;
export const checkVerificationCode: (...args: any[]) => Promise<any> =
  commonCheckVerificationCode as any;
export const getClient: (...args: any[]) => Promise<any> = commonGetClient as any;
export const heartbeat: (...args: any[]) => Promise<any> = commonHeartbeat as any;
export const sendEmailCode: (...args: any[]) => Promise<any> =
  commonSendEmailCode as any;
export const sendSmsCode: (...args: any[]) => Promise<any> =
  commonSendSmsCode as any;
export const getGlobalConfig: (...args: any[]) => Promise<any> =
  commonGetGlobalConfig as any;
export const getPrivacyPolicy: (...args: any[]) => Promise<any> =
  commonGetPrivacyPolicy as any;
export const getStat: (...args: any[]) => Promise<any> = commonGetStat as any;
export const getTos: (...args: any[]) => Promise<any> = commonGetTos as any;
