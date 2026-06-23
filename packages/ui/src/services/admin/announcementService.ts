// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** 更新公告 PUT /v1/admin/announcement */
export async function announcementServiceUpdateAnnouncement(
  body: API.UpdateAnnouncementRequest,
  options?: { [key: string]: any }
) {
  return request<API.AnnouncementReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/announcement`,
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

/** 创建公告 POST /v1/admin/announcement */
export async function announcementServiceCreateAnnouncement(
  body: API.CreateAnnouncementRequest,
  options?: { [key: string]: any }
) {
  return request<API.AnnouncementReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/announcement`,
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

/** 删除公告 DELETE /v1/admin/announcement */
export async function announcementServiceDeleteAnnouncement(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AnnouncementServiceDeleteAnnouncementParams,
  options?: { [key: string]: any }
) {
  return request<API.DeleteAnnouncementReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/announcement`,
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取公告详情 GET /v1/admin/announcement/detail */
export async function announcementServiceGetAnnouncement(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AnnouncementServiceGetAnnouncementParams,
  options?: { [key: string]: any }
) {
  return request<API.AnnouncementReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/announcement/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取公告列表 GET /v1/admin/announcement/list */
export async function announcementServiceListAnnouncements(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AnnouncementServiceListAnnouncementsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListAnnouncementsReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/announcement/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
