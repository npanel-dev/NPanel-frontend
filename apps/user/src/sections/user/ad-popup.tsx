"use client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { getAds } from "@workspace/ui/services/common/common";
import { useEffect, useMemo, useState } from "react";
import { useGlobalStore } from "@/stores/global";

type Ad = {
  id?: number | string;
  title?: string;
  type?: string;
  content?: string;
  description?: string;
  target_url?: string;
  start_time?: number | string;
  end_time?: number | string;
  status?: number | string;
};

function toTimestamp(value: unknown) {
  const timestamp = Number(value ?? 0);
  if (!Number.isFinite(timestamp) || timestamp <= 0) return 0;
  return timestamp > 10_000_000_000 ? Math.floor(timestamp / 1000) : timestamp;
}

function isActiveAd(ad: Ad, now: number) {
  const startTime = toTimestamp(ad.start_time);
  const endTime = toTimestamp(ad.end_time);

  return (
    Number(ad.status ?? 0) === 1 &&
    (startTime === 0 || startTime <= now) &&
    (endTime === 0 || endTime >= now)
  );
}

function AdContent({ ad }: { ad: Ad }) {
  if (ad.type === "video" && ad.content) {
    return (
      // biome-ignore lint/a11y/useMediaCaption: Ad video sources are configured externally and do not provide caption tracks.
      <video
        className="max-h-[60vh] w-full rounded-md bg-muted object-contain"
        controls
        src={ad.content}
      />
    );
  }

  if (ad.type === "image" && ad.content) {
    return (
      <img
        alt={ad.title || "Advertisement"}
        className="max-h-[60vh] w-full rounded-md object-contain"
        height={540}
        src={ad.content}
        width={960}
      />
    );
  }

  return null;
}

export default function AdPopup() {
  const { user } = useGlobalStore();
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["common-ads"],
    queryFn: async () => {
      const result = await getAds(
        {
          device: "web",
          position: "popup",
        },
        {
          skipErrorHandler: true,
        }
      );
      return (result.data?.data?.list || result.data?.list || []) as Ad[];
    },
    enabled: !!user,
  });

  const activeAd = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    return data?.find((ad) => isActiveAd(ad, now)) || null;
  }, [data]);

  useEffect(() => {
    if (activeAd) setOpen(true);
  }, [activeAd]);

  if (!activeAd) return null;

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{activeAd.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <AdContent ad={activeAd} />
          {activeAd.description ? (
            <p className="whitespace-pre-wrap text-muted-foreground text-sm">
              {activeAd.description}
            </p>
          ) : null}
          {activeAd.target_url ? (
            <Button asChild className="w-full">
              <a
                href={activeAd.target_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {activeAd.target_url}
              </a>
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
