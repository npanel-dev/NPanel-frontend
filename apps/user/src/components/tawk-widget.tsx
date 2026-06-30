import { getCookie } from "@workspace/ui/lib/cookies";
import { getTawkIdentity } from "@workspace/ui/services/user/user";
import { useEffect } from "react";
import { useGlobalStore } from "@/stores/global";

declare global {
  interface Window {
    Tawk_API?: {
      visitor?: Record<string, string>;
      onLoad?: () => void;
      setAttributes?: (
        attributes: Record<string, string>,
        callback?: (error?: unknown) => void
      ) => void;
      hideWidget?: () => void;
      showWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

const TAWK_SCRIPT_ID = "tawk-widget-script";

function removeTawkScript() {
  document.getElementById(TAWK_SCRIPT_ID)?.remove();
  window.Tawk_API?.hideWidget?.();
}

async function applyVisitorIdentity() {
  try {
    const { data } = await getTawkIdentity({ skipErrorHandler: true });
    const identity = data?.data;
    if (!identity) {
      return;
    }

    const attributes: Record<string, string> = {};
    if (identity.name) {
      attributes.name = identity.name;
    }
    if (identity.email) {
      attributes.email = identity.email;
    }
    if (identity.user_id) {
      attributes.user_id = identity.user_id;
    }
    if (identity.hash) {
      attributes.hash = identity.hash;
    }

    if (Object.keys(attributes).length === 0) {
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.visitor = attributes;
    window.Tawk_API.setAttributes?.(attributes);
  } catch {
    // Chat must not block the portal when identity enrichment fails.
  }
}

export function TawkWidget() {
  const { common, user } = useGlobalStore();
  const tawk = common.tawk;

  useEffect(() => {
    if (!(tawk?.enabled && tawk.property_id && tawk.widget_id)) {
      removeTawkScript();
      return;
    }

    const scriptSrc = `https://embed.tawk.to/${encodeURIComponent(
      tawk.property_id
    )}/${encodeURIComponent(tawk.widget_id)}`;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.showWidget?.();

    const shouldIdentify = Boolean(
      tawk.identify_user && getCookie("Authorization")
    );
    window.Tawk_API.onLoad = () => {
      if (shouldIdentify) {
        applyVisitorIdentity();
      }
    };

    const existing = document.getElementById(
      TAWK_SCRIPT_ID
    ) as HTMLScriptElement | null;
    if (existing?.src === scriptSrc) {
      if (shouldIdentify) {
        applyVisitorIdentity();
      }
      return;
    }

    existing?.remove();

    const script = document.createElement("script");
    script.id = TAWK_SCRIPT_ID;
    script.async = true;
    script.charset = "UTF-8";
    script.src = scriptSrc;
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, [
    tawk?.enabled,
    tawk?.property_id,
    tawk?.widget_id,
    tawk?.identify_user,
    tawk?.secure_mode,
    user?.id,
  ]);

  return null;
}
