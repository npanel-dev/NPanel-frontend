/// <reference path="../typings.d.ts" />
import type { InitOptions } from "i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/** 在 i18n 初始化之前同步读取用户上次保存的语言偏好 */
function getSavedLanguage(
  supportedLngs: string[],
  fallback: string,
  storageKey = "language"
): string {
  // 1. 检查 localStorage 中保存的语言
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved && supportedLngs.includes(saved)) {
      return saved;
    }
  } catch {
    // localStorage 不可用时静默降级
  }

  // 2. 检测浏览器语言作为二级 fallback
  try {
    const browserLangs =
      typeof navigator !== "undefined"
        ? navigator.languages?.length
          ? Array.from(navigator.languages)
          : navigator.language
            ? [navigator.language]
            : []
        : [];

    for (const lang of browserLangs) {
      // 2a. 精确匹配
      if (supportedLngs.includes(lang)) {
        return lang;
      }
      // 2b. 前缀匹配（如 "zh" 匹配 "zh-CN"，"en" 匹配 "en-US"）
      const prefix = (lang.split("-")[0] ?? lang).toLowerCase();
      const matched = supportedLngs.find(
        (supported) =>
          (supported.split("-")[0] ?? supported).toLowerCase() === prefix
      );
      if (matched) {
        return matched;
      }
    }
  } catch {
    // navigator 不可用时静默降级
  }

  // 3. 都没匹配，使用 fallback
  return fallback;
}

export function initializeI18n(i18nConfig?: InitOptions) {
  const supportedLngs = (i18nConfig?.supportedLngs as string[]) ?? [
    "en-US",
    "zh-CN",
  ];
  const fallbackLng =
    typeof i18nConfig?.fallbackLng === "string"
      ? i18nConfig.fallbackLng
      : "en-US";

  // 同步读取保存的语言，避免刷新后闪英文
  const initialLng = getSavedLanguage(supportedLngs, fallbackLng);

  const initPromise = i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      // 基础语言配置
      fallbackLng,
      supportedLngs,

      // 插值配置
      interpolation: {
        escapeValue: false,
      },

      // 命名空间
      defaultNS: "components",
      ns: [],

      // React 集成
      react: {
        useSuspense: true,
      },

      // 允许调用方覆盖大部分选项
      ...i18nConfig,

      // backend 深度合并：确保调用方的 loadPath 能覆盖内置默认值
      backend: {
        crossDomain: false,
        withCredentials: false,
        allowMultiLoading: false,
        loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
        ...((i18nConfig?.backend as Record<string, unknown>) ?? {}),
      },

      // lng 必须放在最后，确保始终使用 localStorage 中保存的语言
      lng: initialLng,
    });

  window.i18n = i18n;

  // 暴露初始化 Promise，方便调用方在渲染前 await，彻底避免首屏闪烁
  i18n.readyPromise = initPromise;
  return i18n;
}
