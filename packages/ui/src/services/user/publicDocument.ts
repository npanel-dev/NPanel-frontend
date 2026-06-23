// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** QueryDocumentDetail 查询文档详情 GET /v1/public/document/detail */
export async function publicDocumentQueryDocumentDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PublicDocumentQueryDocumentDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.DocumentDetailReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/document/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** QueryDocumentList 查询文档列表 GET /v1/public/document/list */
export async function publicDocumentQueryDocumentList(options?: {
  [key: string]: any;
}) {
  return request<API.DocumentListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/document/list`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
