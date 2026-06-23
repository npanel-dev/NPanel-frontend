import request from "@workspace/ui/lib/request";

export async function basicHeartbeat(
  params: { service_name?: string; secret?: string },
  options?: { [key: string]: any }
) {
  return request<{
    code?: number;
    data?: Record<string, unknown>;
    message?: string;
  }>(`${import.meta.env.VITE_API_PREFIX || ""}/basic/heartbeat`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}
