import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import {
  defineConfig,
  loadEnv,
  type Plugin,
  type UserConfig,
} from "vite";

/**
 * Packages that make up the markdown rendering pipeline.
 *
 * `react-syntax-highlighter` pulls in the full Prism language set (~900KB),
 * and KaTeX + remark/rehype add another chunk on top. Grouping them into a
 * dedicated `markdown-vendor` chunk keeps them out of the main bundle so they
 * are only loaded by the routes that actually render markdown.
 */
const MARKDOWN_VENDOR_PACKAGES = [
  "react-markdown",
  "react-syntax-highlighter",
  "refractor",
  "prismjs",
  "katex",
  "rehype-katex",
  "remark-math",
  "remark-gfm",
  "remark-toc",
  "remark-rehype",
  "remark-parse",
  "remark-stringify",
  "rehype-raw",
  "rehype",
  "unified",
  "mdast",
  "micromark",
  "hast",
  "hast-util",
  "hastscript",
  "trim-lines",
  "character-entities",
  "property-information",
  "space-separated-tokens",
  "comma-separated-tokens",
  "trough",
  "vfile",
  "unist",
  "unist-util",
  "bail",
  "is-plain-obj",
  "decode-named-character-reference",
  "html-url-attributes",
];

const MARKDOWN_VENDOR_RE = new RegExp(
  `node_modules[/\\\\](${MARKDOWN_VENDOR_PACKAGES.map((p) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  ).join("|")})[/\\\\]@?`,
);

/**
 * Rollup `manualChunks` matcher shared across apps.
 *
 * Only markdown-related dependencies are split out explicitly — everything
 * else falls back to Rollup's default chunking to avoid over-splitting.
 */
export function manualChunks(id: string): string | undefined {
  if (MARKDOWN_VENDOR_RE.test(id)) {
    return "markdown-vendor";
  }
  return undefined;
}

/**
 * Emits a `version.lock` file (root package version) into the app dist dir.
 *
 * Mirrors the version exposed by the running app for cache-busting checks.
 * Paths resolve against `process.cwd()` (the app directory), not this shared
 * package's location.
 */
export function versionLockPlugin(): Plugin {
  return {
    name: "version-lock",
    apply: "build",
    closeBundle() {
      // process.cwd() is the app root (apps/user, apps/admin, ...). The
      // monorepo root package.json sits two levels up.
      const distDir = path.resolve(process.cwd(), "dist");
      const rootPkgPath = path.resolve(
        process.cwd(),
        "../../package.json",
      );
      const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf-8"));
      const version = rootPkg.version || "0.0.0";

      mkdirSync(distDir, { recursive: true });
      writeFileSync(path.join(distDir, "version.lock"), version);
    },
  };
}

export interface CreateAppConfigOptions {
  /** Port for the TanStack devtools event bus. Must be unique per app. */
  devtoolsPort: number;
  /** Extra plugins appended after the shared plugin set. */
  extraPlugins?: Plugin[];
  /** Overrides merged on top of the shared config (e.g. base, build). */
  overrides?: UserConfig;
}

/**
 * Shared Vite config factory for the SPA apps (user / admin).
 *
 * Encapsulates the common plugin stack, `@` alias, dev proxy, and the build
 * options (static assets dir + markdown-vendor chunking) that every SPA app
 * needs. Pass per-app bits (devtools port, extra plugins) via options.
 */
export function createAppConfig({
  devtoolsPort,
  extraPlugins = [],
  overrides = {},
}: CreateAppConfigOptions) {
  return defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    const config: UserConfig = {
      base: "/",
      plugins: [
        devtools({ eventBusConfig: { port: devtoolsPort } }),
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
        }),
        viteReact(),
        tailwindcss(),
        versionLockPlugin(),
        ...extraPlugins,
      ],
      resolve: {
        alias: {
          // Resolve against the app's cwd, not this shared package's location.
          "@": path.resolve(process.cwd(), "src"),
        },
      },
      optimizeDeps: {
        exclude: ["@workspace/ui"],
      },
      server: {
        host: "0.0.0.0",
        proxy: {
          "/api": {
            target: env.VITE_API_BASE_URL || "https://api.npanel.dev",
            changeOrigin: true,
            secure: false,
          },
        },
      },
      build: {
        assetsDir: "static",
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
          output: {
            manualChunks,
          },
        },
      },
    };

    // Shallow merge overrides (overrides win). Arrays like `plugins` are
    // intentionally not concatenated here; use `extraPlugins` for that.
    return {
      ...config,
      ...overrides,
      resolve: { ...config.resolve, ...overrides.resolve },
      server: { ...config.server, ...overrides.server },
      build: { ...config.build, ...overrides.build },
    };
  });
}
