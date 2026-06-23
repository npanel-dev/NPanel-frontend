// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** Query revenue statistics GET /v1/admin/console/revenue */
export async function adminConsoleQueryRevenueStatistics(options?: {
  [key: string]: any;
}) {
  return request<API.QueryRevenueStatisticsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/console/revenue`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Query server total data GET /v1/admin/console/server */
export async function adminConsoleQueryServerTotalData(options?: {
  [key: string]: any;
}) {
  return request<API.QueryServerTotalDataReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/console/server`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Query ticket wait reply GET /v1/admin/console/ticket */
export async function adminConsoleQueryTicketWaitReply(options?: {
  [key: string]: any;
}) {
  return request<API.QueryTicketWaitReplyReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/console/ticket`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Query user statistics GET /v1/admin/console/user */
export async function adminConsoleQueryUserStatistics(options?: {
  [key: string]: any;
}) {
  return request<API.QueryUserStatisticsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/console/user`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
