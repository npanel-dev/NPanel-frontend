import request from "@workspace/ui/lib/request";

export async function basicCheckServiceVersion(
  params: { service_name?: string; secret?: string },
  options?: { [key: string]: any }
) {
  return request<{
    code?: number;
    data?: {
      current_version?: string;
      latest_version?: string;
      has_update?: boolean;
    };
    message?: string;
  }>(`${import.meta.env.VITE_API_PREFIX || ""}/basic/check/version`, {
    method: "GET",
    params,
    ...(options || {}),
  });
}
