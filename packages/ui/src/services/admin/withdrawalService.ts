import request from "@workspace/ui/lib/request";

export type WithdrawalRecord = {
  id?: string | number;
  user_id?: string | number;
  userId?: string | number;
  amount?: string | number;
  method?: string;
  content?: string;
  status?: number | string;
  reason?: string;
  created_at?: string | number;
  createdAt?: string | number;
  updated_at?: string | number;
  updatedAt?: string | number;
  processed_at?: string | number;
  processedAt?: string | number;
};

export type GetWithdrawalListParams = {
  page?: string | number;
  size?: string | number;
  user_id?: string | number;
  userId?: string | number;
  status?: string | number;
  method?: string;
};

type WithdrawalListReply = {
  data?: {
    list?: WithdrawalRecord[];
    total?: string | number;
  };
  list?: WithdrawalRecord[];
  total?: string | number;
};

export async function withdrawalServiceApproveWithdrawal(
  body: { id?: string | number },
  options?: { [key: string]: any }
) {
  return request(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/withdrawal/approve`,
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

export async function withdrawalServiceGetWithdrawalList(
  params: GetWithdrawalListParams,
  options?: { [key: string]: any }
) {
  return request<WithdrawalListReply>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/withdrawal/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

export async function withdrawalServiceRejectWithdrawal(
  body: { id?: string | number; reason?: string },
  options?: { [key: string]: any }
) {
  return request(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/withdrawal/reject`,
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
