import { existsSync } from "node:fs";
import path from "node:path";

const rootSwaggerDir = path.resolve(process.cwd(), "docs/public/swagger");
const packageSwaggerDir = path.resolve(process.cwd(), "../../docs/public/swagger");
const swaggerDir = existsSync(rootSwaggerDir) ? rootSwaggerDir : packageSwaggerDir;
const schemaPath = (name: string) => path.join(swaggerDir, `${name}.json`);

const baseConfig = {
  requestLibPath: "import request from '@workspace/ui/lib/request';",
  serversPath: "./src/services",
  apiPrefix: "import.meta.env.VITE_API_PREFIX || ''",
};

const config = [
  {
    ...baseConfig,
    schemaPath: schemaPath("common"),
    projectName: "common",
  },
  {
    ...baseConfig,
    schemaPath: schemaPath("user"),
    projectName: "user",
  },
  {
    ...baseConfig,
    schemaPath: schemaPath("admin"),
    projectName: "admin",
  },
  {
    ...baseConfig,
    schemaPath: schemaPath("gateway"),
    apiPrefix: "",
    projectName: "gateway",
  },
];

export default config;
