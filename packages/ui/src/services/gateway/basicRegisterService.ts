import request from "@workspace/ui/lib/request";

export async function basicRegisterService(
  body: Record<string, unknown>,
  options?: { [key: string]: any }
) {
  return request<{
    code?: number;
    data?: Record<string, unknown>;
    message?: string;
  }>(`${import.meta.env.VITE_API_PREFIX || ""}/basic/register`, {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}
