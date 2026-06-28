import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "@tanstack/react-router";
import { HoverBorderGradient } from "@workspace/ui/components/hover-border-gradient";
import { TextGenerateEffect } from "@workspace/ui/components/text-generate-effect";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";

export function Hero() {
  const { t } = useTranslation("main");
  const { common, user } = useGlobalStore();
  const { site } = common;

  return (
    <div className="grid gap-8 pt-16 sm:grid-cols-2">
      <div className="flex flex-col items-start justify-center">
        <h1 className="my-6 font-bold text-4xl lg:text-6xl">
          {t("welcome", "Welcome to")} {site.site_name}
        </h1>
        {site.site_desc && (
          <TextGenerateEffect
            className="mb-8 max-w-xl *:text-muted-foreground"
            words={site.site_desc}
          />
        )}
        <Link to={user ? "/dashboard" : "/auth"}>
          <HoverBorderGradient
            as="button"
            className="m-0.5 flex items-center space-x-2 text-white"
            containerClassName="rounded-full"
          >
            {t("started", "Get Started")}
          </HoverBorderGradient>
        </Link>
      </div>
      <div className="flex w-full">
        <DotLottieReact
          autoplay
          className="min-h-64 w-full sm:min-h-80"
          loop
          src="/assets/lotties/network-security.json"
        />
      </div>
    </div>
  );
}
