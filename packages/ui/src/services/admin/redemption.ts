// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 此处后端没有提供注释 PUT /v1/admin/redemption/code */
export async function redemptionUpdateRedemptionCode(
  body: API.UpdateRedemptionCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateRedemptionCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/code`,
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

export {
  redemptionUpdateRedemptionCode as updateRedemptionCode,
  redemptionCreateRedemptionCode as createRedemptionCode,
  redemptionDeleteRedemptionCode as deleteRedemptionCode,
  redemptionBatchDeleteRedemptionCode as batchDeleteRedemptionCode,
  redemptionGetRedemptionCodeList as getRedemptionCodeList,
  redemptionToggleRedemptionCodeStatus as toggleRedemptionCodeStatus,
  redemptionGetRedemptionRecordList as getRedemptionRecordList,
};

/** 此处后端没有提供注释 POST /v1/admin/redemption/code */
export async function redemptionCreateRedemptionCode(
  body: API.CreateRedemptionCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateRedemptionCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/code`,
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

/** 此处后端没有提供注释 DELETE /v1/admin/redemption/code */
export async function redemptionDeleteRedemptionCode(
  body: API.DeleteRedemptionCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.DeleteRedemptionCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/code`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 DELETE /v1/admin/redemption/code/batch */
export async function redemptionBatchDeleteRedemptionCode(
  body: API.BatchDeleteRedemptionCodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BatchDeleteRedemptionCodeReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/code/batch`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /v1/admin/redemption/code/list */
export async function redemptionGetRedemptionCodeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RedemptionGetRedemptionCodeListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetRedemptionCodeListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/code/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 PUT /v1/admin/redemption/code/status */
export async function redemptionToggleRedemptionCodeStatus(
  body: API.ToggleRedemptionCodeStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.ToggleRedemptionCodeStatusReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/code/status`,
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

/** 此处后端没有提供注释 GET /v1/admin/redemption/record/list */
export async function redemptionGetRedemptionRecordList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RedemptionGetRedemptionRecordListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetRedemptionRecordListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/redemption/record/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
