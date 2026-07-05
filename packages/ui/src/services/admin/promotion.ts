// 薄封装：把生成函数（带 promotionService 前缀）重导出为短名，便于业务代码调用。
export {
  promotionServiceCreateRechargePromotion as createRechargePromotion,
  promotionServiceUpdateRechargePromotion as updateRechargePromotion,
  promotionServiceDeleteRechargePromotion as deleteRechargePromotion,
  promotionServiceGetRechargePromotionList as getRechargePromotionList,
  promotionServiceUpdateRechargePromotionStatus as updateRechargePromotionStatus,
} from "./promotionService";
