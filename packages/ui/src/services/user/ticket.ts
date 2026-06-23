// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** UpdateUserTicketStatus updates ticket status PUT /v1/public/ticket */
export async function ticketUpdateUserTicketStatus(
  body: API.UpdateUserTicketStatusRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/ticket`,
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
  ticketUpdateUserTicketStatus as updateUserTicketStatus,
  ticketCreateUserTicket as createUserTicket,
  ticketGetUserTicketDetails as getUserTicketDetails,
  ticketCreateUserTicketFollow as createUserTicketFollow,
  ticketGetUserTicketList as getUserTicketList,
};

/** CreateUserTicket creates a new ticket POST /v1/public/ticket */
export async function ticketCreateUserTicket(
  body: API.CreateUserTicketRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/ticket`,
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

/** GetUserTicketDetails gets ticket details GET /v1/public/ticket/detail */
export async function ticketGetUserTicketDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TicketGetUserTicketDetailsParams,
  options?: { [key: string]: any }
) {
  return request<API.TicketInfo>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/ticket/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** CreateUserTicketFollow creates a follow-up for ticket POST /v1/public/ticket/follow */
export async function ticketCreateUserTicketFollow(
  body: API.CreateUserTicketFollowRequest,
  options?: { [key: string]: any }
) {
  return request<any>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/ticket/follow`,
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

/** GetUserTicketList gets user's ticket list with pagination GET /v1/public/ticket/list */
export async function ticketGetUserTicketList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TicketGetUserTicketListParams,
  options?: { [key: string]: any }
) {
  return request<API.GetUserTicketListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/ticket/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
