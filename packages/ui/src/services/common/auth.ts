// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** AdminGenerateCaptcha generates admin captcha data POST /v1/auth/admin/captcha/generate */
export async function authAdminGenerateCaptcha(options?: {
  [key: string]: any;
}) {
  return request<API.GenerateCaptchaReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/admin/captcha/generate`,
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** AdminVerifySliderCaptcha verifies admin slider captcha POST /v1/auth/admin/captcha/slider/verify */
export async function authAdminVerifySliderCaptcha(
  body: API.VerifySliderCaptchaRequest,
  options?: { [key: string]: any }
) {
  return request<API.VerifySliderCaptchaReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/auth/admin/captcha/slider/verify`,
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

/** AdminLogin logs in admin with email and password POST /v1/auth/admin/login */
export async function authAdminLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/admin/login`,
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

/** AdminResetPassword resets admin password with email POST /v1/auth/admin/reset */
export async function authAdminResetPassword(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/admin/reset`,
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

/** GenerateCaptcha generates captcha data POST /v1/auth/captcha/generate */
export async function authGenerateCaptcha(options?: { [key: string]: any }) {
  return request<API.GenerateCaptchaReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/captcha/generate`,
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** VerifySliderCaptcha verifies slider captcha POST /v1/auth/captcha/slider/verify */
export async function authVerifySliderCaptcha(
  body: API.VerifySliderCaptchaRequest,
  options?: { [key: string]: any }
) {
  return request<API.VerifySliderCaptchaReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/captcha/slider/verify`,
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

/** CheckUser checks if user email exists GET /v1/auth/check */
export async function authCheckUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AuthCheckUserParams,
  options?: { [key: string]: any }
) {
  return request<API.CheckUserReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/check`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Check if user exists by telephone GET /v1/auth/check-telephone */
export async function authCheckUserTelephone(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AuthCheckUserTelephoneParams,
  options?: { [key: string]: any }
) {
  return request<API.CheckUserTelephoneReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/check-telephone`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** CheckUserTelephone checks if user telephone exists GET /v1/auth/check/telephone */
export async function authCheckUserTelephone2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AuthCheckUserTelephoneParams,
  options?: { [key: string]: any }
) {
  return request<API.CheckUserTelephoneReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/check/telephone`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** UserLogin logs in user with email and password POST /v1/auth/login */
export async function authUserLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/login`,
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

/** DeviceLogin logs in user with device identifier POST /v1/auth/login/device */
export async function authDeviceLogin(
  body: API.DeviceLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/login/device`,
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

/** TelephoneLogin logs in user with telephone and password or code POST /v1/auth/login/telephone */
export async function authTelephoneLogin(
  body: API.TelephoneLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/login/telephone`,
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

/** UserRegister registers a new user with email POST /v1/auth/register */
export async function authUserRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/register`,
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

/** TelephoneRegister registers a new user with telephone POST /v1/auth/register/telephone */
export async function authTelephoneRegister(
  body: API.TelephoneRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/register/telephone`,
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

/** ResetPassword resets user password with email POST /v1/auth/reset */
export async function authResetPassword(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/reset`,
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

/** TelephoneResetPassword resets user password with telephone POST /v1/auth/reset/telephone */
export async function authTelephoneResetPassword(
  body: API.TelephoneResetPasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.LoginReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/auth/reset/telephone`,
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

export const adminGenerateCaptcha: (...args: any[]) => Promise<any> =
  authAdminGenerateCaptcha as any;
export const adminVerifyCaptchaSlider: (...args: any[]) => Promise<any> =
  authAdminVerifySliderCaptcha as any;
export const adminLogin: (...args: any[]) => Promise<any> =
  authAdminLogin as any;
export const adminResetPassword: (...args: any[]) => Promise<any> =
  authAdminResetPassword as any;
export const generateCaptcha: (...args: any[]) => Promise<any> =
  authGenerateCaptcha as any;
export const verifyCaptchaSlider: (...args: any[]) => Promise<any> =
  authVerifySliderCaptcha as any;
export const checkUser: (...args: any[]) => Promise<any> = authCheckUser as any;
export const checkUserTelephone: (...args: any[]) => Promise<any> =
  authCheckUserTelephone as any;
export const userLogin: (...args: any[]) => Promise<any> = authUserLogin as any;
export const deviceLogin: (...args: any[]) => Promise<any> =
  authDeviceLogin as any;
export const telephoneLogin: (...args: any[]) => Promise<any> =
  authTelephoneLogin as any;
export const userRegister: (...args: any[]) => Promise<any> =
  authUserRegister as any;
export const telephoneUserRegister: (...args: any[]) => Promise<any> =
  authTelephoneRegister as any;
export const resetPassword: (...args: any[]) => Promise<any> =
  authResetPassword as any;
export const telephoneResetPassword: (...args: any[]) => Promise<any> =
  authTelephoneResetPassword as any;
