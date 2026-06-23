import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "docs/public/swagger");
const fallbackBackendOpenapi = path.resolve(
  rootDir,
  "../NPanel-backend/openapi.yaml",
);
const backendOpenapiPath =
  process.env.NPANEL_BACKEND_OPENAPI || fallbackBackendOpenapi;

const groups = {
  common: {
    title: "NPanel Common API",
    include: ["/v1/common", "/v1/auth"],
  },
  user: {
    title: "NPanel User API",
    include: ["/v1/public", "/v1/payment", "/v1/subscribe"],
  },
  admin: {
    title: "NPanel Admin API",
    include: ["/v1/admin"],
  },
  gateway: {
    title: "NPanel Gateway API",
    include: ["/v1/server", "/v2/server", "/basic"],
  },
};

function assertBackendOpenapi() {
  if (!existsSync(backendOpenapiPath)) {
    throw new Error(
      `Backend OpenAPI source not found: ${backendOpenapiPath}\n` +
        "Set NPANEL_BACKEND_OPENAPI=/path/to/openapi.yaml or place NPanel-backend next to this repo.",
    );
  }
}

function matchesPrefix(route, prefixes) {
  return prefixes.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`),
  );
}

function normalizeInfo(source, title, version) {
  return {
    ...(source.info || {}),
    title,
    version,
    description:
      "Generated from the NPanel backend OpenAPI definition. Source: NPanel-backend/openapi.yaml.",
  };
}

function buildOpenApi(source, groupName, groupConfig, version) {
  const paths = {};

  for (const [route, methods] of Object.entries(source.paths || {})) {
    if (matchesPrefix(route, groupConfig.include)) {
      paths[route] = methods;
    }
  }

  return {
    openapi: source.openapi || "3.0.3",
    info: normalizeInfo(source, groupConfig.title, version),
    servers: source.servers || [
      {
        url: "/",
        description: "Current NPanel deployment",
      },
    ],
    paths,
    components: source.components || {},
    tags: source.tags,
    security: source.security,
    externalDocs: source.externalDocs,
    "x-generated-from": path.relative(rootDir, backendOpenapiPath),
    "x-generated-group": groupName,
  };
}

assertBackendOpenapi();

const rootPkg = JSON.parse(readFileSync(path.join(rootDir, "package.json"), "utf-8"));
const source = yaml.load(readFileSync(backendOpenapiPath, "utf-8"));

mkdirSync(outputDir, { recursive: true });

for (const [groupName, groupConfig] of Object.entries(groups)) {
  const doc = buildOpenApi(source, groupName, groupConfig, rootPkg.version);
  writeFileSync(
    path.join(outputDir, `${groupName}.json`),
    `${JSON.stringify(doc, null, 2)}\n`,
  );
  console.log(`${groupName}: ${Object.keys(doc.paths).length} paths`);
}
