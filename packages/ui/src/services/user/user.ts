import {
  publicUserBindOAuth,
  publicUserBindOAuthCallback,
  publicUserBindTelegram,
  publicUserCommissionWithdraw,
  publicUserGetDeviceList,
  publicUserGetLoginLog,
  publicUserGetOAuthMethods,
  publicUserGetSubscribeLog,
  publicUserGetTawkIdentity,
  publicUserPreUnsubscribe,
  publicUserQueryUserAffiliate,
  publicUserQueryUserAffiliateList,
  publicUserQueryUserBalanceLog,
  publicUserQueryUserCommissionLog,
  publicUserQueryUserInfo,
  publicUserQueryUserSubscribe,
  publicUserQueryWithdrawalLog,
  publicUserResetUserSubscribeToken,
  publicUserTransferCommissionToBalance,
  publicUserUnbindDevice,
  publicUserUnbindOAuth,
  publicUserUnbindTelegram,
  publicUserUnsubscribe,
  publicUserUpdateBindEmail,
  publicUserUpdateBindMobile,
  publicUserUpdateUserNotify,
  publicUserUpdateUserPassword,
  publicUserUpdateUserRules,
  publicUserUpdateUserSubscribeNote,
  publicUserVerifyEmail,
} from "./publicUser";
import { redemptionServiceRedeemCode } from "./redemptionService";

export const queryUserAffiliate: (...args: any[]) => Promise<any> =
  publicUserQueryUserAffiliate as any;
export const queryUserAffiliateList: (...args: any[]) => Promise<any> =
  publicUserQueryUserAffiliateList as any;
export const queryUserBalanceLog: (...args: any[]) => Promise<any> =
  publicUserQueryUserBalanceLog as any;
export const updateBindEmail: (...args: any[]) => Promise<any> =
  publicUserUpdateBindEmail as any;
export const updateBindMobile: (...args: any[]) => Promise<any> =
  publicUserUpdateBindMobile as any;
export const bindOAuth: (...args: any[]) => Promise<any> =
  publicUserBindOAuth as any;
export const bindOAuthCallback: (...args: any[]) => Promise<any> =
  publicUserBindOAuthCallback as any;
export const bindTelegram: (...args: any[]) => Promise<any> =
  publicUserBindTelegram as any;
export const queryUserCommissionLog: (...args: any[]) => Promise<any> =
  publicUserQueryUserCommissionLog as any;
export const commissionWithdraw: (...args: any[]) => Promise<any> =
  publicUserCommissionWithdraw as any;
export const transferCommissionToBalance: (...args: any[]) => Promise<any> =
  publicUserTransferCommissionToBalance as any;
export const getDeviceList: (...args: any[]) => Promise<any> =
  publicUserGetDeviceList as any;
export const queryUserInfo: (...args: any[]) => Promise<any> =
  publicUserQueryUserInfo as any;
export const getTawkIdentity: (...args: any[]) => Promise<any> =
  publicUserGetTawkIdentity as any;
export const getLoginLog: (...args: any[]) => Promise<any> =
  publicUserGetLoginLog as any;
export const updateUserNotify: (...args: any[]) => Promise<any> =
  publicUserUpdateUserNotify as any;
export const getOAuthMethods: (...args: any[]) => Promise<any> =
  publicUserGetOAuthMethods as any;
export const updateUserPassword: (...args: any[]) => Promise<any> =
  publicUserUpdateUserPassword as any;
export const updateUserRules: (...args: any[]) => Promise<any> =
  publicUserUpdateUserRules as any;
export const queryUserSubscribe: (...args: any[]) => Promise<any> =
  publicUserQueryUserSubscribe as any;
export const getSubscribeLog: (...args: any[]) => Promise<any> =
  publicUserGetSubscribeLog as any;
export const updateUserSubscribeNote: (...args: any[]) => Promise<any> =
  publicUserUpdateUserSubscribeNote as any;
export const resetUserSubscribeToken: (...args: any[]) => Promise<any> =
  publicUserResetUserSubscribeToken as any;
export const unbindDevice: (...args: any[]) => Promise<any> =
  publicUserUnbindDevice as any;
export const unbindOAuth: (...args: any[]) => Promise<any> =
  publicUserUnbindOAuth as any;
export const unbindTelegram: (...args: any[]) => Promise<any> =
  publicUserUnbindTelegram as any;
export const unsubscribe: (...args: any[]) => Promise<any> =
  publicUserUnsubscribe as any;
export const preUnsubscribe: (...args: any[]) => Promise<any> =
  publicUserPreUnsubscribe as any;
export const verifyEmail: (...args: any[]) => Promise<any> =
  publicUserVerifyEmail as any;
export const queryWithdrawalLog: (...args: any[]) => Promise<any> =
  publicUserQueryWithdrawalLog as any;
export const redeemCode: (...args: any[]) => Promise<any> =
  redemptionServiceRedeemCode as any;
