// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 更新文档 PUT /v1/admin/document */
export async function documentServiceUpdateDocument(
  body: API.UpdateDocumentRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateDocumentReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/document`,
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

/** 创建文档 POST /v1/admin/document */
export async function documentServiceCreateDocument(
  body: API.CreateDocumentRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateDocumentReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/document`,
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

/** 删除文档 DELETE /v1/admin/document */
export async function documentServiceDeleteDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DocumentServiceDeleteDocumentParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteDocumentReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/document`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 批量删除文档 DELETE /v1/admin/document/batch */
export async function documentServiceBatchDeleteDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DocumentServiceBatchDeleteDocumentParams,
  options?: { [key: string]: any }
) {
  return request<API.BatchDeleteDocumentReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/document/batch`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取文档详情 GET /v1/admin/document/detail */
export async function documentServiceGetDocumentDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DocumentServiceGetDocumentDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.GetDocumentDetailReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/document/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取文档列表 GET /v1/admin/document/list */
export async function documentServiceGetDocumentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DocumentServiceGetDocumentListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetDocumentListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/document/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
