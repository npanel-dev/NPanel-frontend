import request from "@workspace/ui/lib/request";

interface UploadImageResponse {
  code: number;
  message: string;
  data?: {
    url?: string;
    path?: string;
  };
}

export async function uploadImage(file: File | Blob) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await request<UploadImageResponse>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/upload/image`,
    {
      method: "POST",
      data: formData,
    }
  );

  const url = data.data?.url || data.data?.path;
  if (!url) {
    throw new Error(data.message || "Image upload failed");
  }
  return url;
}
