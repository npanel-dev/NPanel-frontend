// @ts-ignore
/* eslint-disable */
import request from "@workspace/ui/lib/request";

/** QueryAnnouncement 查询公告列表 GET /v1/public/announcement/list */
export async function announcementQueryAnnouncement(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AnnouncementQueryAnnouncementParams,
  options?: { [key: string]: any }
) {
  return request<API.QueryAnnouncementReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/announcement/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

export { announcementQueryAnnouncement as queryAnnouncement };
