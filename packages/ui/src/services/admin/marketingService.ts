// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** GetBatchSendEmailTaskList 获取批量发送邮件任务列表 GET /v1/admin/marketing/email/batch/list */
export async function marketingServiceGetBatchSendEmailTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MarketingServiceGetBatchSendEmailTaskListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetBatchSendEmailTaskListReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/marketing/email/batch/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** GetPreSendEmailCount 获取预发送邮件数量 POST /v1/admin/marketing/email/batch/pre-send-count */
export async function marketingServiceGetPreSendEmailCount(
  body: API.GetPreSendEmailCountRequest,
  options?: { [key: string]: any }
) {
  return request<API.GetPreSendEmailCountReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/marketing/email/batch/pre-send-count`,
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

/** CreateBatchSendEmailTask 创建批量发送邮件任务 POST /v1/admin/marketing/email/batch/send */
export async function marketingServiceCreateBatchSendEmailTask(
  body: API.CreateBatchSendEmailTaskRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateBatchSendEmailTaskReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/marketing/email/batch/send`,
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

/** GetBatchSendEmailTaskStatus 获取批量发送邮件任务状态 POST /v1/admin/marketing/email/batch/status */
export async function marketingServiceGetBatchSendEmailTaskStatus(
  body: API.GetBatchSendEmailTaskStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.GetBatchSendEmailTaskStatusReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/marketing/email/batch/status`,
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

/** StopBatchSendEmailTask 停止批量发送邮件任务 POST /v1/admin/marketing/email/batch/stop */
export async function marketingServiceStopBatchSendEmailTask(
  body: API.StopBatchSendEmailTaskRequest,
  options?: { [key: string]: any }
) {
  return request<API.StopBatchSendEmailTaskReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/marketing/email/batch/stop`,
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

/** CreateQuotaTask 创建配额任务 POST /v1/admin/marketing/quota/create */
export async function marketingServiceCreateQuotaTask(
  body: API.CreateQuotaTaskRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateQuotaTaskReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/marketing/quota/create`,
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

/** QueryQuotaTaskList 查询配额任务列表 GET /v1/admin/marketing/quota/list */
export async function marketingServiceQueryQuotaTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MarketingServiceQueryQuotaTaskListParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryQuotaTaskListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/marketing/quota/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** QueryQuotaTaskPreCount 查询配额任务预计数量 POST /v1/admin/marketing/quota/pre-count */
export async function marketingServiceQueryQuotaTaskPreCount(
  body: API.QueryQuotaTaskPreCountRequest,
  options?: { [key: string]: any }
) {
  return request<API.QueryQuotaTaskPreCountReply>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/marketing/quota/pre-count`,
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
