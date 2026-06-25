export type SubscribeCategorySection = {
  id: string;
  name: string;
  subscriptions: API.Subscribe[];
};

type SubscribeCatalog =
  | API.QuerySubscribeCatalogReply
  | API.GetSubscriptionCatalogReply;

type SubscribeCatalogInput =
  | SubscribeCatalog
  | {
      data?: SubscribeCatalog | null;
    };

function unwrapSubscribeCatalog(catalog?: SubscribeCatalogInput | null) {
  if (!catalog) {
    return;
  }

  if ("data" in catalog) {
    return catalog.data || undefined;
  }

  return catalog;
}

function walkCategory(
  category: API.SubscribeCategory,
  sections: SubscribeCategorySection[]
) {
  const subscriptions = (category.list || []).filter(
    (item: API.Subscribe) => item.show !== false
  );
  if (subscriptions.length > 0) {
    sections.push({
      id: String(category.id),
      name: category.name || "",
      subscriptions,
    });
  }

  for (const child of category.children || []) {
    walkCategory(child, sections);
  }
}

export function buildSubscribeSections(
  catalog?: SubscribeCatalogInput | null,
  uncategorizedLabel = "Uncategorized"
) {
  const subscribeCatalog = unwrapSubscribeCatalog(catalog);
  const sections: SubscribeCategorySection[] = [];
  for (const category of subscribeCatalog?.categories || []) {
    walkCategory(category, sections);
  }

  const uncategorized = (subscribeCatalog?.uncategorized || []).filter(
    (item: API.Subscribe) => item.show !== false
  );
  if (uncategorized.length > 0) {
    sections.push({
      id: "uncategorized",
      name: uncategorizedLabel,
      subscriptions: uncategorized,
    });
  }

  return sections;
}

export function flattenSubscribeCatalog(
  catalog?: SubscribeCatalogInput | null
) {
  return buildSubscribeSections(catalog).flatMap(
    (section) => section.subscriptions
  );
}
