import {
  publicOrderCloseOrder,
  publicOrderPreCreateOrder,
  publicOrderPurchase,
  publicOrderQueryOrderDetail,
  publicOrderQueryOrderList,
  publicOrderRecharge,
  publicOrderRenewal,
  publicOrderResetTraffic,
} from "./publicOrder";

export const closeOrder: (...args: any[]) => Promise<any> =
  publicOrderCloseOrder as any;
export const queryOrderDetail: (...args: any[]) => Promise<any> =
  publicOrderQueryOrderDetail as any;
export const queryOrderList: (...args: any[]) => Promise<any> =
  publicOrderQueryOrderList as any;
export const preCreateOrder: (...args: any[]) => Promise<any> =
  publicOrderPreCreateOrder as any;
export const purchase: (...args: any[]) => Promise<any> =
  publicOrderPurchase as any;
export const recharge: (...args: any[]) => Promise<any> =
  publicOrderRecharge as any;
export const renewal: (...args: any[]) => Promise<any> =
  publicOrderRenewal as any;
export const resetTraffic: (...args: any[]) => Promise<any> =
  publicOrderResetTraffic as any;
