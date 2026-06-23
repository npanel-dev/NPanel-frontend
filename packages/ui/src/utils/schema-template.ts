function normalizeObjectExpression(expr: string, values: Record<string, string>) {
  return expr
    .trim()
    .replace(/\b(url|name)\b/g, (key) => JSON.stringify(values[key] ?? ""))
    .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, content: string) =>
      JSON.stringify(content.replace(/\\'/g, "'"))
    )
    .replace(/([{,]\s*)([A-Za-z_$][\w$-]*)(\s*:)/g, "$1\"$2\"$3")
    .replace(/,\s*([}\]])/g, "$1");
}

function parseTemplateExpression(
  expr: string,
  values: Record<string, string>,
): unknown {
  const trimmed = expr.trim();

  if (trimmed === "url" || trimmed === "name") {
    return values[trimmed] ?? "";
  }

  if (trimmed.includes("server_remote")) {
    return {
      server_remote: [`${values.url ?? ""}, tag=${values.name ?? ""}`],
    };
  }

  try {
    return JSON.parse(normalizeObjectExpression(trimmed, values));
  } catch {
    return undefined;
  }
}

function stringifyTemplateExpression(
  expr: string,
  values: Record<string, string>,
) {
  const parsed = parseTemplateExpression(expr, values);
  return parsed === undefined ? undefined : JSON.stringify(parsed);
}

export function renderAppSubscribeSchema(
  schema: string | undefined,
  values: { name: string; url: string },
) {
  if (!schema) return "url";

  try {
    let result = schema
      .replace(/\${url}/g, values.url)
      .replace(/\${name}/g, values.name);

    const maxLoop = 10;
    let prev: string;
    let loop = 0;

    do {
      prev = result;

      result = result.replace(
        /\${encodeURIComponent\(JSON\.stringify\(([^)]+)\)\)}/g,
        (match, expr: string) => {
          const json = stringifyTemplateExpression(expr, values);
          return json === undefined ? match : encodeURIComponent(json);
        },
      );

      result = result.replace(
        /\${encodeURIComponent\(([^)]+)\)}/g,
        (match, expr: string) => {
          const parsed = parseTemplateExpression(expr, values);
          if (typeof parsed === "string") return encodeURIComponent(parsed);
          return match;
        },
      );

      result = result.replace(
        /\${window\.btoa\(([^)]+)\)}/g,
        (match, expr: string) => {
          const parsed = parseTemplateExpression(expr, values);
          if (typeof parsed !== "string") return match;
          const btoa =
            typeof window !== "undefined" && window.btoa
              ? window.btoa
              : (str: string) => str;
          return btoa(parsed);
        },
      );

      result = result.replace(
        /\${JSON\.stringify\(([^}]+)\)}/g,
        (match, expr: string) => {
          const json = stringifyTemplateExpression(expr, values);
          return json === undefined ? match : json;
        },
      );

      loop++;
    } while (result !== prev && loop < maxLoop);

    return result;
  } catch {
    return "";
  }
}
