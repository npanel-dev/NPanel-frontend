// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** UpdateTicketStatus 更新工单状态 PUT /v1/admin/ticket */
export async function ticketUpdateTicketStatus(
  body: API.UpdateTicketStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.UpdateTicketStatusReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ticket`,
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
  ticketUpdateTicketStatus as updateTicketStatus,
  ticketGetTicket as getTicket,
  ticketCreateTicketFollow as createTicketFollow,
  ticketGetTicketList as getTicketList,
};

/** GetTicket 获取工单详情 GET /v1/admin/ticket/detail */
export async function ticketGetTicket(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TicketGetTicketParams,
  options?: { [key: string]: any }
) {
  return request<API.GetTicketReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ticket/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** CreateTicketFollow 创建工单跟进 POST /v1/admin/ticket/follow */
export async function ticketCreateTicketFollow(
  body: API.CreateTicketFollowRequest,
  options?: { [key: string]: any }
) {
  return request<API.CreateTicketFollowReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ticket/follow`,
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

/** GetTicketList 获取工单列表 GET /v1/admin/ticket/list */
export async function ticketGetTicketList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TicketGetTicketListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetTicketListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ticket/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
